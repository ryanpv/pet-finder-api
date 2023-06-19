import admin from 'firebase-admin';
import { serviceAccount } from './firebase-service-account';

export const appAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});