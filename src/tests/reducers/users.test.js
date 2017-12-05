import usersReducer from '../../reducers/users';
import { user1, user2 } from '../fixtures/users';

const usersReducerDefaultState = {
  preferences: {},
  author: {},
  isLoading: true
};

test('should create user', () => {
  const action = {
    type: 'CREATE_USER',
    newUser: user1
  };
  const state = usersReducer(undefined, action);
  expect(state.preferences).toEqual(user1);
});

test('should update user preferences', () => {
  const action = {
    type: 'UPDATE_USER_PREFERENCES',
    updates: { username: 'new username' }
  };
  const state = usersReducer({ user2 }, action);
  expect(state.preferences.username).toEqual('new username');
});

test('should set author', () => {
  const action = {
    type: 'SET_AUTHOR',
    author: user1
  };
  const state = usersReducer(usersReducerDefaultState, action);
  expect(state.author).toEqual(user1);
});

test('should add star to user', () => {
  const action = {
    type: 'ADD_USER_STAR',
    nextStars: 150
  };
  const state = usersReducer({ author: user2 }, action);
  expect(state.author.stars).toBe(150);
});

test('should set user preferences', () => {
  const action = {
    type: 'SET_USER_PREFERENCES',
    preferences: user2
  };
  const state = usersReducer(usersReducerDefaultState, action);
  expect(state.preferences).toEqual(user2);
});

test('should set loading to true', () => {
  const state = usersReducer(
    { ...usersReducerDefaultState, isLoading: false },
    { type: 'USERS_IS_LOADING', isLoading: true }
  );
  expect(state.isLoading).toBe(true);
});

test('should set hasErrored to true', () => {
  const state = usersReducer(usersReducerDefaultState, {
    type: 'USERS_HAS_ERRORED',
    hasErrored: true
  });
  expect(state.hasErrored).toBe(true);
});
