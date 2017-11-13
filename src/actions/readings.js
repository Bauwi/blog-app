import { db } from '../firebase/firebase';
import moment from 'moment';
import axios from 'axios';

// manage reading all posts
export const setPostsSample = posts => ({
  type: 'SET_POSTS_SAMPLE',
  posts
});

export const startSetPostsSample = sampleSize => dispatch =>
  db
    .collection('posts')
    .orderBy('createdAt', 'desc')
    .limit(50)
    .get()
    .then((querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        posts.push({
          id: doc.id,
          ...doc.data()
        });
      });
      dispatch(setPostsSample(posts));
    });

// manage reading specific user posts.

export const setSpecificUserPosts = posts => ({
  type: 'SET_SPECIFIC_USER_POSTS',
  posts
});

export const startSetSpecificUserPosts = id => dispatch =>
  db
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
      dispatch(setSpecificUserPosts(posts));
    });

// manage reading a single post.
// make it current.
export const setOnePost = post => ({
  type: 'SET_ONE_POST',
  post
});

export const startSetOnePost = id => (dispatch, getState) =>
  db
    .collection('posts')
    .doc(id)
    .get()
    .then(doc =>
      dispatch(setOnePost({
        id: doc.id,
        ...doc.data()
      })));
