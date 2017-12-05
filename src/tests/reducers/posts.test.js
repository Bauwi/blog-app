import postsReducer from '../../reducers/posts';

import { posts } from '../fixtures/run';

const postsReducerDefaultState = { posts: [] };

test('should set default state', () => {
  const state = postsReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual(postsReducerDefaultState);
});

test('should remove post if id provided', () => {
  const action = { type: 'REMOVE_POST', id: posts[1].id };
  const state = postsReducer({ posts }, action);
  expect(state).toEqual({ posts: [posts[0], posts[2]] });
});

test('should not remove anything if id not found', () => {
  const action = { type: 'REMOVE_POST', id: 'dumbId' };
  const state = postsReducer({ posts }, action);
  expect(state).toEqual({ posts });
});

test('should add a post', () => {
  const newPost = {
    id: '4',
    title: 'Post 4 in Run',
    body: [{ text: 'This is the fourth Post in run', attributes: 'h2' }],
    keywords: 'chicken, dolphin, koala',
    createdAt: 35000,
    stars: 22,
    author: 'author2',
    authorId: 'author2Id',
    readingTime: 12,
    cover: 'https://www.w3schools.com/w3css/img_fjords.jpg',
    miniCover: 'https://www.w3schools.com/w3css/img_fjords.jpg'
  };
  const action = {
    type: 'ADD_POST',
    post: newPost
  };
  const state = postsReducer({ posts }, action);
  expect(state).toEqual({ posts: [...posts, newPost] });
});

test('should edit a post', () => {
  const action = {
    type: 'EDIT_POST',
    id: posts[2].id,
    updates: {
      title: 'title has changed'
    }
  };
  const state = postsReducer({ posts }, action);
  expect(state.posts[2].title).toBe('title has changed');
});

test('should not edit expense if id not found', () => {
  const action = {
    type: 'EDIT_POST',
    id: 'dumbId',
    updates: {
      title: 'title has changed'
    }
  };
  const state = postsReducer({ posts }, action);
  expect(state).toEqual({ posts });
});

test('should set posts', () => {
  const action = {
    type: 'SET_POSTS',
    posts: [posts[1]]
  };
  const state = postsReducer({ posts: [] }, action);
  expect(state.posts).toEqual([posts[1]]);
});

test('should set loading true', () => {
  const action = {
    type: 'POSTS_IS_LOADING',
    isLoading: true
  };
  const state = postsReducer({ posts }, action);
  expect(state.isLoading).toBe(true);
});

test('should set hasErrored true', () => {
  const action = {
    type: 'POSTS_HAS_ERRORED',
    hasErrored: true
  };
  const state = postsReducer({ posts }, action);
  expect(state.hasErrored).toBe(true);
});
