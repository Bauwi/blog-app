import readingsReducer from '../../reducers/readings';
import { posts } from '../fixtures/run';

const readingsDefaultState = { isLoading: true };

test('should set one post', () => {
  const action = {
    type: 'SET_ONE_POST',
    post: posts[1]
  };
  const state = readingsReducer(readingsDefaultState, action);
  expect(state.current).toEqual(posts[1]);
});

test('should set specific user posts', () => {
  const action = {
    type: 'SET_SPECIFIC_USER_POSTS',
    posts
  };
  const state = readingsReducer(readingsDefaultState, action);
  expect(state.currentUserPosts).toEqual(posts);
});

test('should set posts sample', () => {
  const action = {
    type: 'SET_POSTS_SAMPLE',
    posts
  };
  const state = readingsReducer(readingsDefaultState, action);
  expect(state.posts).toEqual(posts);
});

test('should up post stars', () => {
  const action = {
    type: 'UP_POST_STARS_READINGS'
  };
  const state = readingsReducer({ ...readingsDefaultState, current: posts[2] }, action);
  expect(state.current.stars).toEqual(posts[2].stars + 1);
});

test('should set loading true', () => {
  const state = readingsReducer(
    { ...readingsDefaultState, isLoading: false },
    { type: 'READINGS_IS_LOADING', isLoading: true }
  );
  expect(state.isLoading).toBe(true);
});

test('should set hasErrored true', () => {
  const state = readingsReducer(readingsDefaultState, {
    type: 'READINGS_HAS_ERRORED',
    hasErrored: true
  });
  expect(state.hasErrored).toBe(true);
});
