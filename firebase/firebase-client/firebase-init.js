import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase-config.js';
import { getAuth } from 'firebase/auth';

const firebaseApp = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(firebaseApp);