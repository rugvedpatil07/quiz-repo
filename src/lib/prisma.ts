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
    findMany: async () => [],
    findUnique: async () => null,
  }
} as any;
