import runReducer from '../../reducers/run';
import run from '../fixtures/run';

const { posts } = run;
const runReducerDefaultState = {
  isLoading: true,
  posts: [],
  hasErrored: false,
  current: {}
};

test('should add post to run', () => {
  const action = {
    type: 'ADD_POST_TO_RUN',
    post: posts[1]
  };
  const state = runReducer(runReducerDefaultState, action);
  expect(state.posts).toEqual([posts[1]]);
});

test('should remove post from run', () => {
  const action = {
    type: 'REMOVE_POST_TO_RUN',
    id: posts[2].content.id
  };
  const state = runReducer(run, action);
  expect(state.posts).toEqual([posts[0], posts[1]]);
});

test('should set run', () => {
  const action = {
    type: 'SET_RUN_POSTS',
    posts
  };
  const state = runReducer(runReducerDefaultState, action);
  expect(state.posts).toEqual(posts);
});

test('should set loading true', () => {
  const action = {
    type: 'RUN_IS_LOADING',
    isLoading: true
  };
  const state = runReducer({ ...runReducerDefaultState, isLoading: false }, action);
  expect(state.isLoading).toBe(true);
});

test('should set hasErrored true', () => {
  const action = {
    type: 'RUN_HAS_ERRORED',
    hasErrored: true
  };
  const state = runReducer(runReducerDefaultState, action);
  expect(state.isLoading).toBe(true);
});

test('should set current post run', () => {
  const action = {
    type: 'SET_CURRENT_POST_RUN',
    id: posts[1].content.id
  };
  const state = runReducer({ ...runReducerDefaultState, posts }, action);
  expect(state.current).toEqual(posts[1]);
});

test('should update current to already read', () => {
  const action = {
    type: 'UPDATE_RUN_POST_TO_ALREADY_READ',
    id: posts[1].content.id
  };
  const state = runReducer({ ...runReducerDefaultState, current: posts[1], posts }, action);
  expect(state.current.state).toEqual('read');
  expect(state.posts[1].state).toEqual('read');
});

test('should reset run', () => {
  const action = {
    type: 'RESET_RUN'
  };
  const state = runReducer({ ...runReducerDefaultState, posts }, action);
  expect(state).toEqual({ ...runReducerDefaultState, isLoading: false });
});

test('should clean run', () => {
  const action = {
    type: 'CLEAN_RUN'
  };
  const state = runReducer({ ...runReducerDefaultState, posts }, action);
  expect(state).toEqual({ ...runReducerDefaultState, posts: [posts[1]] });
});
