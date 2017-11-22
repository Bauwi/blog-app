import * as firebase from 'firebase';
import 'firebase/firestore';
import moment from 'moment';

// const config = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.FIREBASE_DATABASE_URL,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
// };

const config = {
  apiKey: 'AIzaSyAnR5WQOqx2Pn-wwLZJLuqhmUpWn7DwZZ8',
  authDomain: 'blog-app-1de4a.firebaseapp.com',
  databaseURL: 'https://blog-app-1de4a.firebaseio.com',
  projectId: 'blog-app-1de4a',
  storageBucket: 'blog-app-1de4a.appspot.com',
  messagingSenderId: '280995665949'
};

firebase.initializeApp(config);

const database = firebase.database();
const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

console.log('NODE_ENV', process.env.NODE_ENV);
console.log('API_KEY', process.env.APP_KEY);

export { firebase, googleAuthProvider, db, database as default };
