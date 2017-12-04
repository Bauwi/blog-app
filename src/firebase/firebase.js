import * as firebase from 'firebase';
import 'firebase/firestore';

// const config = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.FIREBASE_DATABASE_URL,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
// };

// prod db
const config = {
  apiKey: 'AIzaSyAnR5WQOqx2Pn-wwLZJLuqhmUpWn7DwZZ8',
  authDomain: 'blog-app-1de4a.firebaseapp.com',
  databaseURL: 'https://blog-app-1de4a.firebaseio.com',
  projectId: 'blog-app-1de4a',
  storageBucket: 'blog-app-1de4a.appspot.com',
  messagingSenderId: '280995665949'
};

// test db
// const config = {
//   apiKey: 'AIzaSyD6cHe3MlZ3yIocga-GJ2Xdnp_NYweuFl8',
//   authDomain: 'blog-app-test-d877e.firebaseapp.com',
//   databaseURL: 'https://blog-app-test-d877e.firebaseio.com',
//   projectId: 'blog-app-test-d877e',
//   storageBucket: 'blog-app-test-d877e.appspot.com',
//   messagingSenderId: '782980817179'
// };

firebase.initializeApp(config);

const database = firebase.database();
const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const githubAuthProvider = new firebase.auth.GithubAuthProvider();

export { firebase, googleAuthProvider, githubAuthProvider, db, database as default };
