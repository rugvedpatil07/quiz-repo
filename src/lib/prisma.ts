import fs from 'fs';
import path from 'path';

const getDbPath = () => path.resolve(process.cwd(), 'mock-db.json');

const loadDB = () => {
  try {
    const dbPath = getDbPath();
    if (fs.existsSync(dbPath)) {
      return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    }
  } catch (e) {}
  return { users: [] };
};

const saveDB = (db: any) => {
  try {
    fs.writeFileSync(getDbPath(), JSON.stringify(db, null, 2));
  } catch (e) {}
};

// Auto-assign IDs to questions/options that don't have them (fixes old quizzes)
let idCounter = 100000;
const ensureQuizIds = (quiz: any) => {
  if (!quiz.questions) return quiz;
  const patched = { ...quiz };
  patched.questions = patched.questions.map((q: any) => {
    const patchedQ = { ...q };
    if (!patchedQ.id) patchedQ.id = idCounter++;
    if (patchedQ.options) {
      patchedQ.options = patchedQ.options.map((o: any) => {
        if (!o.id) return { ...o, id: idCounter++ };
        return o;
      });
    }
    return patchedQ;
  });
  // Ensure _count exists
  if (!patched._count) {
    patched._count = { questions: patched.questions.length };
  }
  return patched;
};

export const prisma = {
  user: {
    findMany: async () => {
      const db = loadDB();
      return db.users || [];
    },
    findUnique: async (args: any) => {
      const db = loadDB();
      if (args.where?.email) {
        return db.users.find((u: any) => u.email === args.where.email) || null;
      }
      if (args.where?.verificationToken) {
        return db.users.find((u: any) => u.verificationToken === args.where.verificationToken) || null;
      }
      return null;
    },
    create: async (args: any) => {
      const db = loadDB();
      const newUser = { 
        id: `mock-id-${Date.now()}`, 
        emailVerified: false,
        ...args.data 
      };
      db.users.push(newUser);
      saveDB(db);
      return newUser;
    },
    update: async (args: any) => {
      const db = loadDB();
      const index = db.users.findIndex((u: any) => {
        if (args.where?.id) return u.id === args.where.id;
        if (args.where?.email) return u.email === args.where.email;
        return false;
      });
      
      if (index !== -1) {
        db.users[index] = { ...db.users[index], ...args.data };
        saveDB(db);
        return db.users[index];
      }
      throw new Error("Record to update not found.");
    },
  },
  quiz: {
    findMany: async (args?: any) => {
      const db = loadDB();
      let quizzes = (db.quizzes || []).map(ensureQuizIds);

      // Support basic where filtering
      if (args?.where) {
        const w = args.where;
        quizzes = quizzes.filter((q: any) => {
          if (w.category && q.category !== w.category) return false;
          if (w.subcategory && q.subcategory !== w.subcategory) return false;
          if (w.OR && Array.isArray(w.OR)) {
            return w.OR.some((cond: any) => {
              if (cond.title?.contains && q.title?.toLowerCase().includes(cond.title.contains.toLowerCase())) return true;
              if (cond.description?.contains && q.description?.toLowerCase().includes(cond.description.contains.toLowerCase())) return true;
              return false;
            });
          }
          return true;
        });
      }

      // Support orderBy
      if (args?.orderBy?.createdAt === 'desc') {
        quizzes.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }

      return quizzes;
    },
    findUnique: async (args: any) => {
      const db = loadDB();
      if (args.where?.id) {
        const quiz = (db.quizzes || []).find((q: any) => q.id === args.where.id) || null;
        return quiz ? ensureQuizIds(quiz) : null;
      }
      return null;
    },
    create: async (args: any) => {
      const db = loadDB();
      if (!db.quizzes) db.quizzes = [];
      const newQuiz = { 
        id: Date.now(), 
        createdAt: new Date().toISOString(),
        ...args.data 
      };
      db.quizzes.push(newQuiz);
      saveDB(db);
      return newQuiz;
    },
    update: async (args: any) => {
      const db = loadDB();
      if (!db.quizzes) db.quizzes = [];
      const index = db.quizzes.findIndex((q: any) => q.id === args.where?.id);
      
      if (index !== -1) {
        db.quizzes[index] = { ...db.quizzes[index], ...args.data };
        saveDB(db);
        return db.quizzes[index];
      }
      throw new Error("Record to update not found.");
    },
  },
  attempt: {
    findUnique: async (args: any) => {
      const db = loadDB();
      if (args.where?.id) {
        const attempt = (db.attempts || []).find((a: any) => a.id === args.where.id) || null;
        if (attempt) {
          attempt.quiz = (db.quizzes || []).find((q: any) => q.id === attempt.quizId) || null;
        }
        return attempt;
      }
      return null;
    },
    create: async (args: any) => {
      const db = loadDB();
      if (!db.attempts) db.attempts = [];
      
      // For mock DB, we extract the nested answers creation
      const answersData = args.data.answers?.create || [];
      
      const newAttempt = { 
        id: Date.now(), 
        createdAt: new Date().toISOString(),
        userId: args.data.userId,
        quizId: args.data.quizId,
        score: args.data.score,
        answers: answersData
      };
      
      db.attempts.push(newAttempt);
      saveDB(db);
      return newAttempt;
    }
  }
} as any;
