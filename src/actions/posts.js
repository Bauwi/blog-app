import database from '../firebase/firebase';
import { db } from '../firebase/firebase';

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
    shortBody,
    keywords = {},
    createdAt = 0,
    stars = 0,
    author,
    authorId = uid
  } = postData;
  const post = {
    title,
    body,
    shortBody,
    keywords,
    createdAt,
    stars,
    author,
    authorId
  };
  return db
    .collection('posts')
    .add(post)
    .then((doc) => {
      dispatch(addPost({
        id: doc.id,
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
    .then(() => {
      dispatch(editPost(id, updates));
    });

export const setPosts = posts => ({
  type: 'SET_POSTS',
  posts
});

export const startSetPosts = id => (dispatch, getState) => {
  const { uid } = getState().auth;
  return db
    .collection('posts')
    .where('authorId', '==', `${uid}`)
    .get()
    .then((querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        posts.push({
          id: doc.id,
          ...doc.data()
        });
        console.log(doc.id, ' => ', doc.data());
        console.log(posts);
      });
      dispatch(setPosts(posts));
    });
};

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
