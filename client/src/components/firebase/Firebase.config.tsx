import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyC5G67obM_4iiF_Am28z5ifbTEbzmDe9Xc',
  authDomain: 'cou-visionary-coders.firebaseapp.com',
  projectId: 'cou-visionary-coders',
  storageBucket: 'cou-visionary-coders.firebasestorage.app',
  messagingSenderId: '430900147490',
  appId: '1:430900147490:web:d52584eea91ab5d752e17b',
  measurementId: 'G-GKGQBD8VVX',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
