import database from '../firebase/firebase';
import { db } from '../firebase/firebase';
import * as firebase from 'firebase';
import axios from 'axios';

export const updateUser = (id, updates) => ({
  type: 'UPDATE_USER_PREFERENCES',
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
// used to display UserCard from post id
export const startSetAuthorFromUserId = userId => dispatch =>
  db
    .collection('users')
    .doc(userId)
    .get()
    .then((doc) => {
      dispatch(setAuthor(doc.data()));
    });

export const setUserPreferences = preferences => ({
  type: 'SET_USER_PREFERENCES',
  preferences
});

export const startSetUserPreferences = () => (dispatch, getState) =>
  db
    .collection('users')
    .doc(getState().auth.uid)
    .get()
    .then((doc) => {
      dispatch(setUserPreferences(doc.data()));
    });

export const uploadAvatar = (userId, avatar) => (dispatch) => {
  const storageAvatar = firebase.storage().ref(`avatars/${userId}`);
  const ROOT_URL = 'https://firebasestorage.googleapis.com/v0/b/blog-app-1de4a.appspot.com/o';

  return storageAvatar
    .put(avatar)
    .then(() => {
      const url = `${ROOT_URL}/avatars%2F${userId}`;
      return axios.get(url);
    })
    .then((ref) => {
      const avatarJSON = ref.data;
      const avatarSrc = `${ROOT_URL}/avatars%2F${avatarJSON.name.slice(
        8,
        36
      )}?alt=media&token=${avatarJSON.downloadTokens}`;
      dispatch(startUpdateUser(userId, { avatar: avatarSrc }));
      return avatarSrc;
    });
};
