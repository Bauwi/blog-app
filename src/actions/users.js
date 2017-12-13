import database from '../firebase/firebase';
import { db } from '../firebase/firebase';
import * as firebase from 'firebase';
import axios from 'axios';

// manage CRU/D of users

export const createUser = newUser => ({
  type: 'CREATE_USER',
  newUser
});

export const startCreateUser = () => (dispatch, getState) => {
  const { uid } = getState().auth;
  const newUser = {
    avatar: 'http://www.perlworkshop.nl/nlpw2016/img/default-avatar.png',
    description:
      'I had three chairs in my house; one for solitude, two for friendship, three for society.',
    email: '',
    username: 'Anonymous',
    stars: 0,
    numberOfPosts: 0,
    topCategories: ['music', 'litterature', 'programming']
  };
  return db
    .collection('users')
    .doc(uid)
    .set(newUser)
    .then(() => dispatch(createUser(newUser)));
};

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
    });
};

// Add a star to user. Always used simultaneously with addPostStar
export const addUserStar = nextStars => ({
  type: 'ADD_USER_STAR',
  nextStars
});

export const startAddUserStar = (id, prevStars) => dispatch => db
  .collection('users')
  .doc(id)
  .update({ stars: prevStars + 1 })
  .then(() => dispatch(addUserStar(prevStars + 1)));

export const usersHasErrored = bool => ({
  type: 'USERS_HAS_ERRORED',
  hasErrored: bool
});

export const usersIsLoading = bool => ({
  type: 'USERS_IS_LOADING',
  isLoading: bool
});

// Used when reading a post. Get the author of this particualr post informations (i.e. preferences)
// useful in UserCard
export const setAuthor = author => ({
  type: 'SET_AUTHOR',
  author
});
// used to display UserCard from post id
export const startSetAuthorFromUserId = userId => (dispatch) => {
  dispatch(usersIsLoading(true));
  return db
    .collection('users')
    .doc(userId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc;
      }
    })
    .then(doc => dispatch(setAuthor(doc.data())))
    .then(() => dispatch(usersIsLoading(false)))
    .catch(() => dispatch(usersHasErrored(true)));
};

// Set the user preferences
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
      if (doc.exists) {
        return dispatch(setUserPreferences(doc.data()));
      }
      return dispatch(startCreateUser()).then(() => startSetUserPreferences());
    });

// Used in /preferences. Same logic as uploadImage in posts action file.
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
