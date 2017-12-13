// T0D0: add firestore calls tests
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as firebase from 'firebase';
import database from '../../firebase/firebase';
import {
  startAddPost,
  addPost,
  removePost,
  editPost,
  startEditPost,
  setPosts,
  startSetPosts,
  startRemovePost
} from '../../actions/posts';
import { db } from '../../firebase/firebase';
import run from '../fixtures/run';

const posts = run.posts.map(post => post.content);

const uid = '123abc';
const defaultAuthState = { auth: { uid } };
const createMockStore = configureMockStore([thunk]);

test('should setup remove post action object', () => {
  const action = removePost('123abc');
  expect(action).toEqual({
    type: 'REMOVE_POST',
    id: '123abc'
  });
});

test('should setup add post action object', () => {
  const action = addPost({ ...run.posts[0].content });
  expect(action).toEqual({ type: 'ADD_POST', post: run.posts[0].content });
});

test('should setup edit post action object', () => {
  const action = editPost('123abc', { title: 'new title' });
  expect(action).toEqual({
    type: 'EDIT_POST',
    id: '123abc',
    updates: {
      title: 'new title'
    }
  });
});

test('should setup set posts action object', () => {
  const action = setPosts(posts);
  expect(action).toEqual({
    type: 'SET_POSTS',
    posts
  });
});
