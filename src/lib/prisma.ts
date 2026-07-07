import { supabase } from './supabase';

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
      const { data } = await supabase.from('users').select('*');
      if (data) {
        data.forEach(u => {
          if (u.emailverified !== undefined) u.emailVerified = u.emailverified;
        });
      }
      return data || [];
    },
    findUnique: async (args: any) => {
      let data = null;
      if (args.where?.email) {
        const result = await supabase.from('users').select('*').eq('email', args.where.email).single();
        data = result.data;
      } else if (args.where?.verificationToken) {
        const result = await supabase.from('users').select('*').eq('verificationToken', args.where.verificationToken).single();
        data = result.data;
      } else if (args.where?.id) {
        const result = await supabase.from('users').select('*').eq('id', args.where.id).single();
        data = result.data;
      }
      
      if (data && data.emailverified !== undefined) {
        data.emailVerified = data.emailverified;
      }
      return data || null;
    },
    create: async (args: any) => {
      const newUser: any = { 
        id: `mock-id-${Date.now()}`, 
        emailverified: false,
        email: args.data.email,
        name: args.data.name,
        image: args.data.image,
        verificationToken: args.data.verificationToken,
        password: args.data.password,
        role: args.data.role,
        bio: args.data.bio,
      };
      
      // Remove undefined fields
      Object.keys(newUser).forEach(key => newUser[key] === undefined && delete newUser[key]);
      if (newUser.emailVerified !== undefined) {
        newUser.emailverified = newUser.emailVerified;
        delete newUser.emailVerified;
      }
      
      const { data, error } = await supabase.from('users').insert(newUser).select().single();
      if (error) console.error("Error creating user:", error);
      
      const result = data || newUser;
      if (result.emailverified !== undefined) {
        result.emailVerified = result.emailverified;
      }
      return result;
    },
    update: async (args: any) => {
      const updateData = { ...args.data };
      if (updateData.emailVerified !== undefined) {
        updateData.emailverified = updateData.emailVerified;
        delete updateData.emailVerified;
      }
      
      let query = supabase.from('users').update(updateData);
      if (args.where?.id) query = query.eq('id', args.where.id);
      else if (args.where?.email) query = query.eq('email', args.where.email);
      
      const { data, error } = await query.select().single();
      if (error) throw new Error("Record to update not found.");
      
      if (data.emailverified !== undefined) {
        data.emailVerified = data.emailverified;
      }
      return data;
    },
  },
  quiz: {
    findMany: async (args?: any) => {
      let query = supabase.from('quizzes').select('*');

      // Support basic where filtering
      if (args?.where) {
        const w = args.where;
        if (w.category) query = query.eq('category', w.category);
        if (w.subcategory) query = query.eq('subcategory', w.subcategory);
      }

      // Support orderBy
      if (args?.orderBy?.createdAt === 'desc') {
        query = query.order('createdAt', { ascending: false });
      }

      const { data } = await query;
      let quizzes = data || [];

      // Handle OR queries in memory for simplicity since it's hard to map exactly
      if (args?.where?.OR && Array.isArray(args.where.OR)) {
        const w = args.where;
        quizzes = quizzes.filter((q: any) => {
          return w.OR.some((cond: any) => {
            if (cond.title?.contains && q.title?.toLowerCase().includes(cond.title.contains.toLowerCase())) return true;
            if (cond.description?.contains && q.description?.toLowerCase().includes(cond.description.contains.toLowerCase())) return true;
            return false;
          });
        });
      }

      return quizzes.map(ensureQuizIds);
    },
    findUnique: async (args: any) => {
      if (args.where?.id) {
        const { data } = await supabase.from('quizzes').select('*').eq('id', args.where.id).single();
        return data ? ensureQuizIds(data) : null;
      }
      return null;
    },
    create: async (args: any) => {
      const newQuiz = { 
        id: Date.now(), 
        createdAt: new Date().toISOString(),
        title: args.data.title,
        description: args.data.description,
        category: args.data.category,
        subcategory: args.data.subcategory,
        timeLimit: args.data.timeLimit,
        questions: args.data.questions,
        _count: args.data._count,
        creatorId: args.data.creatorId,
        creator: args.data.creator
      };
      
      // Remove undefined fields
      Object.keys(newQuiz).forEach(key => newQuiz[key as keyof typeof newQuiz] === undefined && delete newQuiz[key as keyof typeof newQuiz]);

      const { data, error } = await supabase.from('quizzes').insert(newQuiz).select().single();
      if (error) {
        console.error("Error creating quiz in Supabase:", error);
        throw new Error(error.message);
      }
      return data || newQuiz;
    },
    update: async (args: any) => {
      if (!args.where?.id) throw new Error("No ID provided for update");
      
      const updateData = {
        title: args.data.title,
        description: args.data.description,
        category: args.data.category,
        subcategory: args.data.subcategory,
        timeLimit: args.data.timeLimit,
        questions: args.data.questions,
        _count: args.data._count
      };
      
      // Remove undefined fields
      Object.keys(updateData).forEach(key => updateData[key as keyof typeof updateData] === undefined && delete updateData[key as keyof typeof updateData]);

      const { data, error } = await supabase.from('quizzes').update(updateData).eq('id', args.where.id).select().single();
      if (error) throw new Error("Record to update not found.");
      return data;
    },
  },
  attempt: {
    findUnique: async (args: any) => {
      if (args.where?.id) {
        const { data: attempt } = await supabase.from('attempts').select('*').eq('id', args.where.id).single();
        if (attempt) {
          const { data: quiz } = await supabase.from('quizzes').select('*').eq('id', attempt.quizId).single();
          attempt.quiz = quiz || null;
        }
        return attempt || null;
      }
      return null;
    },
    create: async (args: any) => {
      const answersData = args.data.answers?.create || [];
      
      const newAttempt = { 
        id: Date.now(), 
        createdAt: new Date().toISOString(),
        userId: args.data.userId,
        quizId: args.data.quizId,
        score: args.data.score,
        answers: answersData
      };
      
      const { data, error } = await supabase.from('attempts').insert(newAttempt).select().single();
      if (error) console.error("Error creating attempt:", error);
      return data || newAttempt;
    }
  }
} as any;
