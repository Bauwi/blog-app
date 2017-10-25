import database from '../firebase/firebase';

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
  return database
    .ref(`users/${uid}/posts`)
    .push(post)
    .then((ref) => {
      dispatch(addPost({
        id: ref.key,
        ...post
      }));
    });
};

export const removePost = id => ({
  type: 'REMOVE_POST',
  id
});

export const startRemovePost = id => (dispatch, getState) => {
  const { uid } = getState().auth;
  return database
    .ref(`users/${uid}/posts/${id}`)
    .remove()
    .then(() => {
      dispatch(removePost(id));
    });
};

export const editPost = (id, updates) => ({
  type: 'EDIT_POST',
  id,
  updates
});

export const startEditPost = (id, updates) => (dispatch, getState) => {
  const { uid } = getState().auth;
  return database
    .ref(`users/${uid}/posts/${id}`)
    .update(updates)
    .then(() => {
      dispatch(editPost(id, updates));
    });
};

export const setPosts = posts => ({
  type: 'SET_POSTS',
  posts
});

export const startSetPosts = id => (dispatch, getState) =>
  database
    .ref(`users/${id}/posts`)
    .once('value')
    .then((snapshot) => {
      const posts = [];
      snapshot.forEach((childSnapshot) => {
        posts.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      dispatch(setPosts(posts));
    });

// export const startSetAllPosts = () => dispatch =>
//   database
//     .ref('users')
//     .once('value')
//     .then((snapshot) => {
//       const posts = [];
//       snapshot.forEach((childSnapshot) => {
//         childSnapshot.forEach((grandChildSnapshot) => {
//           grandChildSnapshot.forEach((grandGrandChildSnapshot) => {
//             posts.push({
//               ...grandGrandChildSnapshot.val()
//             });
//           });
//           console.log('blabla');
//           // posts.push({
//           //   ...grandChildSnapshot.val()
//           // });
//         });
//       });
//       dispatch(setPosts(posts));
//     });

export const addStar = (id, authorId) => ({
  type: 'ADD_STAR',
  id,
  authorId
});

export const startAddStar = (id, authorId, count) => (dispatch, getState) =>
  database
    .ref(`users/${authorId}/posts/${id}`)
    .set(count)
    .then(() => {
      dispatch(addStar(id, authorId));
    });
