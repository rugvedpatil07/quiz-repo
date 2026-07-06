import { getApps, initializeApp, credential } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

if (!getApps().length) {
  try {
    // If you have a service account JSON, you would load it here.
    // For now, we initialize without explicit credentials (assumes default application credentials or env variables)
    // If this fails during token verification, you will need to add FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY to your .env
    initializeApp({
      projectId: "master-quiz-rp07",
      // credential: credential.cert({
      //   projectId: process.env.FIREBASE_PROJECT_ID,
      //   clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      //   privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      // }),
    });
  } catch (error) {
    console.error('Firebase Admin initialization error', error);
  }
}

export const adminAuth = getAuth();
