import admin from 'firebase-admin';
import { serviceAccount } from './firebase-service-account.js';

export const appAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export default appAdmin