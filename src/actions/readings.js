import { db } from '../firebase/firebase';
import moment from 'moment';
import axios from 'axios';
import { startSetAuthorFromUserId } from './users';

// manage reading all posts
// set readings in home

export const readingssHasErrored = bool => ({
  type: 'READINGS_HAS_ERRORED',
  hasErrored: bool
});

export const readingsIsLoading = bool => ({
  type: 'READINGS_IS_LOADING',
  isLoading: bool
});

export const setPostsSample = posts => ({
  type: 'SET_POSTS_SAMPLE',
  posts
});

// Find the last 100 posts.
export const startSetPostsSample = () => (dispatch) => {
  dispatch(readingsIsLoading(true));
  return db
    .collection('posts')
    .orderBy('createdAt', 'desc')
    .limit(100)
    .get()
    .then((querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        posts.push({
          id: doc.id,
          ...doc.data()
        });
      });
      dispatch(readingsIsLoading(false));
      return posts;
    })
    .then(posts => dispatch(setPostsSample(posts)))
    .catch(() => dispatch(readingssHasErrored(true)));
};

// manage reading specific user posts.

export const setSpecificUserPosts = posts => ({
  type: 'SET_SPECIFIC_USER_POSTS',
  posts
});

export const startSetSpecificUserPosts = id => (dispatch) => {
  dispatch(readingsIsLoading(true));
  return db
    .collection('posts')
    .where('authorId', '==', id)
    .get()
    .then((querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        posts.push({
          id: doc.id,
          ...doc.data()
        });
      });
      posts.sort((a, b) => a.createdAt - b.createdAt);
      return posts;
    })
    .then(posts => dispatch(setSpecificUserPosts(posts)))
    .then(() => dispatch(startSetAuthorFromUserId(id)))
    .then(() => dispatch(readingsIsLoading(false)))
    .catch(() => dispatch(readingssHasErrored(true)));
};

// manage reading a single post.
// make it current.
export const setOnePost = post => ({
  type: 'SET_ONE_POST',
  post
});

export const startSetOnePost = id => (dispatch, getState) => {
  dispatch(readingsIsLoading(true));
  return db
    .collection('posts')
    .doc(id)
    .get()
    .then(doc =>
      dispatch(setOnePost({
        id: doc.id,
        ...doc.data()
      })))
    .then(ref => dispatch(startSetAuthorFromUserId(ref.post.authorId)))
    .then(() => dispatch(readingsIsLoading(false)))
    .catch(() => dispatch(readingssHasErrored(true)));
};
