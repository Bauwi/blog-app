import database from '../firebase/firebase';
import { db } from '../firebase/firebase';
import * as firebase from 'firebase';

export const addPostToRun = post => ({
  type: 'ADD_POST_TO_RUN',
  post
});

export const startAddPostToRun = post => (dispatch, getState) => {
  const { uid } = getState().auth;
  console.log(post);
  db
    .collection('runs')
    .doc(uid)
    .collection('UserRuns')
    .add(post)
    .then((doc) => {
      dispatch(addPostToRun({
        DBid: doc.id,
        ...post
      }));
    });
};

export const removePostToRun = id => ({
  type: 'REMOVE_POST_TO_RUN',
  id
});

export const startRemovePostToRun = (id, DBid) => (dispatch, getState) => {
  const { uid } = getState().auth;
  console.log(DBid);
  return db
    .collection('runs')
    .doc(uid)
    .collection('UserRuns')
    .doc(`${DBid}`)
    .delete()
    .then(dispatch(removePostToRun(id)));
};

export const setRunPosts = posts => ({
  type: 'SET_RUN_POSTS',
  posts
});

export const startSetRunPosts = () => (dispatch, getState) => {
  const { uid } = getState().auth;
  return db
    .collection('runs')
    .doc(uid)
    .collection('UserRuns')
    .get()
    .then((querySnapshot) => {
      const run = [];
      querySnapshot.forEach((doc) => {
        run.push({
          DBid: doc.id,
          ...doc.data()
        });
      });
      dispatch(setRunPosts(run));
    });
};
