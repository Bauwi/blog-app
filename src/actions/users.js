import { db } from '../firebase/firebase';

export const updateUser = (id, updates) => ({
  type: 'UPDATE_USER',
  id,
  updates
});

export const startUpdateUser = (id, updates) => (dispatch, getState) => {
  const uid = id || getState().auth.uid;
  return db
    .collection('users')
    .doc(uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return db
          .collection('users')
          .doc(uid)
          .update(updates)
          .then(() => {
            dispatch(updateUser(uid, updates));
          });
      }
      return db
        .collection('users')
        .doc(uid)
        .set({
          avatar: 'http://www.perlworkshop.nl/nlpw2016/img/default-avatar.png',
          email: '',
          username: '',
          stars: 0,
          topCategories: ['life', 'programming', 'Music']
        })
        .then(startUpdateUser(uid, updates));
    });
};

export const addUserStar = nextStars => ({
  type: 'ADD_USER_STAR',
  nextStars
});

export const startAddUserStar = (id, prevStars) => dispatch =>
  db
    .collection('users')
    .doc(id)
    .update({ stars: prevStars + 1 })
    .then(() => dispatch(addUserStar(prevStars + 1)));

export const setAuthor = author => ({
  type: 'SET_AUTHOR',
  author
});

export const startSetAuthor = id => dispatch =>
  db
    .collection('users')
    .doc(id)
    .get()
    .then((doc) => {
      dispatch(setAuthor(doc.data()));
    });

export const setUserPreferences = preferences => ({
  type: 'SET_USER_PREFERENCES',
  preferences
});

export const startSetUserPreferences = preferences => (dispatch, getState) =>
  db
    .collection('users')
    .doc(getState().auth.uid)
    .get()
    .then((doc) => {
      dispatch(setUserPreferences(doc.data()));
    });
