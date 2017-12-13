import * as firebase from 'firebase';
import axios from 'axios';
import { db } from '../firebase/firebase';
import { startAddUserStar } from './users';
import { upPostStarsReadings } from './readings';

// Manage CRUD personnal posts
export const addPost = post => ({
  type: 'ADD_POST',
  post
});

export const startAddPost = (postData = {}) => (dispatch, getState) => {
  const { uid } = getState().auth;
  const {
    title = '',
    body = '',
    keywords = {},
    createdAt = 0,
    stars = 0,
    author,
    authorId = uid,
    readingTime,
    cover,
    miniCover
  } = postData;
  const post = {
    title,
    body,
    keywords,
    createdAt,
    stars,
    author,
    authorId,
    readingTime
  };
  let doc = [];
  return db
    .collection('posts')
    .add(post)
    .then((ref) => {
      doc = ref;
      return dispatch(uploadImage(ref.id, cover, miniCover));
    })
    .then((ref) => {
      dispatch(addPost({
        id: doc.id,
        miniCover: ref[0],
        cover: ref[1],
        ...post
      }));
    });
};

export const removePost = id => ({
  type: 'REMOVE_POST',
  id
});

export const startRemovePost = id => dispatch =>
  db
    .collection('posts')
    .doc(id)
    .delete()
    .then(() => {
      dispatch(removePost(id));
    });

export const editPost = (id, updates) => ({
  type: 'EDIT_POST',
  id,
  updates
});

export const startEditPost = (id, updates) => dispatch =>
  db
    .collection('posts')
    .doc(id)
    .update(updates)
    .then(() => dispatch(editPost(id, updates)));

export const startUpPostStar = (id, authorId, authorStars) => (dispatch) => {
  const ref = db.collection('posts').doc(id);
  return db
    .runTransaction(transaction =>
      transaction.get(ref).then((doc) => {
        const newStars = doc.data().stars + 1;
        transaction.update(ref, { stars: newStars });
        return newStars;
      }))
    .then(() => dispatch(startAddUserStar(authorId, authorStars)))
    .then(() => dispatch(upPostStarsReadings()));
};

// TODO: IMPROVE THIS USING PROMISE.ALL
// 1: upload cover and minicover to firebasestorage
// 2: update post with cover and minicover resulting urls.
export const uploadImage = (id, cover, miniCover) => (dispatch) => {
  const storageRefMiniCover = firebase.storage().ref(`${id}/mini`);
  const storageRefCover = firebase.storage().ref(`${id}/cover`);
  const ROOT_URL = 'https://firebasestorage.googleapis.com/v0/b/blog-app-1de4a.appspot.com/o';

  return storageRefMiniCover
    .put(miniCover)
    .then(() =>
      storageRefCover.put(cover).then(() => {
        const url = `${ROOT_URL}/${id}%2Fcover`;
        return axios.get(url);
      }))
    .then((ref) => {
      const coverInfos = ref.data;
      const miniCoverSrc = `${ROOT_URL}/${coverInfos.name.slice(
        0,
        20
      )}%2Fmini?alt=media&token=${coverInfos.downloadTokens}`;

      const coverSrc = `${ROOT_URL}/${coverInfos.name.slice(
        0,
        20
      )}%2Fcover?alt=media&token=${coverInfos.downloadTokens}`;
      db
        .collection('posts')
        .doc(id)
        .update({ miniCover: miniCoverSrc, cover: coverSrc })
        .then(() => dispatch(editPost(id, { miniCover: miniCoverSrc, cover: coverSrc })));
      return [miniCoverSrc, coverSrc];
    });
};

// Loading - Error

export const postsHasErrored = bool => ({
  type: 'POSTS_HAS_ERRORED',
  hasErrored: bool
});

export const postsIsLoading = bool => ({
  type: 'POSTS_IS_LOADING',
  isLoading: bool
});

export const setPosts = posts => ({
  type: 'SET_POSTS',
  posts
});

// Manage fetching personnal posts in the dashboard
export const startSetPosts = (id, rangeMin, rangeMax) => (dispatch, getState) => {
  dispatch(postsIsLoading(true));
  const uid = id || getState().auth.uid;
  return db
    .collection('posts')
    .where('authorId', '==', `${uid}`)
    .get()
    .then((querySnapshot) => {
      const allPosts = [];
      querySnapshot.forEach((doc) => {
        allPosts.push({
          id: doc.id,
          ...doc.data()
        });
      });
      const posts = allPosts
        .sort((a, b) => a.createdAt - b.createdAt)
        .reverse()
        .slice(rangeMin, rangeMax);
      dispatch(postsIsLoading(false));
      return posts;
    })
    .then(posts => dispatch(setPosts(posts)))
    .catch(() => dispatch(postsHasErrored(true)));
};
