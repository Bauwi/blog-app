import database from '../firebase/firebase';
import { db } from '../firebase/firebase';
import * as firebase from 'firebase';

export const addPostToRun = post => ({
  type: 'ADD_POST_TO_RUN',
  post
});

export const startAddPostToRun = post => (dispatch, getState) => {
  const { uid } = getState().auth;
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

export const updateRunPostToAlreadyRead = id => ({
  type: 'UPDATE_RUN_POST_TO_ALREADY_READ',
  id
});

export const startUpdateRunPostToAlreadyRead = (id, DBid) => (dispatch, getState) => {
  const { uid } = getState().auth;
  return db
    .collection('runs')
    .doc(uid)
    .collection('UserRuns')
    .doc(`${DBid}`)
    .update({ state: 'read' })
    .then(() => {
      dispatch(updateRunPostToAlreadyRead(id));
    });
};

export const updateRunPostToNotAlreadyRead = id => ({
  type: 'UPDATE_RUN_POST_TO_NOT_ALREADY_READ',
  id
});

export const setCurrentPostRun = id => ({
  type: 'SET_CURRENT_POST_RUN',
  id
});

export const resetRun = () => ({
  type: 'RESET_RUN'
});

export const startResetRun = () => (dispatch, getState) => {
  const { uid } = getState().auth;
  return db
    .collection('runs')
    .doc(uid)
    .collection('UserRuns')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        db
          .collection('runs')
          .doc(uid)
          .collection('UserRuns')
          .doc(doc.ref.id)
          .delete();
      });
    })
    .then(() => dispatch(resetRun()));
};

export const cleanRun = () => ({
  type: 'CLEAN_RUN'
});

export const startCleanRun = alreadyRead => (dispatch, getState) => {
  const { uid } = getState().auth;
  return db
    .collection('runs')
    .doc(uid)
    .collection('UserRuns')
    .get()
    .then((querySnapShot) => {
      querySnapShot.forEach((doc) => {
        if (alreadyRead.includes(doc.ref.id)) {
          db
            .collection('runs')
            .doc(uid)
            .collection('UserRuns')
            .doc(doc.ref.id)
            .delete();
        }
      });
    })
    .then(dispatch(cleanRun()));
};
