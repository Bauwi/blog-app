import React from 'react';
import { shallow } from 'enzyme';
import { AddPost } from '../../../components/posting/AddPost';
import run from '../../fixtures/run';
import { user1 } from '../../fixtures/users';

let startAddPost,
  startUpdateUser,
  history,
  wrapper;

beforeEach(() => {
  startAddPost = jest.fn();
  startUpdateUser = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(<AddPost
    startAddPost={startAddPost}
    startUpdateUser={startUpdateUser}
    history={history}
    preferences={user1}
  />);
});

test('should render post page correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
  wrapper.find('PostForm').prop('onSubmit')(run.posts[1]);
  expect(history.push).toHaveBeenLastCalledWith('/dashboard');
  expect(startUpdateUser).toHaveBeenLastCalledWith(undefined, {
    numberOfPosts: user1.numberOfPosts + 1
  });
  expect(startAddPost).toHaveBeenLastCalledWith(run.posts[1]);
});
