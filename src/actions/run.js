import database from '../firebase/firebase';
import { db } from '../firebase/firebase';
import * as firebase from 'firebase';

// manage CRUD of run
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

// set Run posts. This action is dispatched in the header component
// as it needs to be available for the run dropdown

export const runsHasErrored = bool => ({
  type: 'RUN_HAS_ERRORED',
  hasErrored: bool
});

export const runIsLoading = bool => ({
  type: 'RUN_IS_LOADING',
  isLoading: bool
});

export const setRunPosts = posts => ({
  type: 'SET_RUN_POSTS',
  posts
});

export const startSetRunPosts = resume => (dispatch, getState) => {
  dispatch(runIsLoading(true));
  const { uid } = getState().auth;
  const run = [];
  return db
    .collection('runs')
    .doc(uid)
    .collection('UserRuns')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        run.push({
          DBid: doc.id,
          ...doc.data()
        });
      });
      return run;
    })
    .then(run => dispatch(setRunPosts(run)))
    .then(() => {
      const firstUnreadIndex = run.findIndex(post => post.state === 'unread');
      if (firstUnreadIndex === -1) {
        return dispatch(setCurrentPostRun(run[0].content.id));
      }
      return dispatch(setCurrentPostRun(run[firstUnreadIndex].content.id));
    })
    .then(() => dispatch(runIsLoading(false)))
    .catch(() => dispatch(runsHasErrored(true)));
};

// change the status of the past from read to unread
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

// this one is not used anymore. But it could be used to mark some popst as unread yet
export const updateRunPostToNotAlreadyRead = id => ({
  type: 'UPDATE_RUN_POST_TO_NOT_ALREADY_READ',
  id
});

// Set which post should actually be current. Run navigation depends on this.
// instead of routing, component is updated with currentPost data.
// easier way to deal with "Resume" to provide the user the first unread post in its run.
export const setCurrentPostRun = id => ({
  type: 'SET_CURRENT_POST_RUN',
  id
});

export const startSetCurrentPostRun = id => (dispatch) => {
  dispatch(runIsLoading(true));
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 10);
  })
    .then(() => dispatch(setCurrentPostRun(id)))
    .then(() => dispatch(runIsLoading(false)))
    .catch(() => dispatch(runsHasErrored(true)));
};

export const resetRun = () => ({
  type: 'RESET_RUN'
});

// remove all posts in tun
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

// Remove already read posts in run
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
