import React from 'react';
import { shallow } from 'enzyme';
import { EditPost } from '../../../components/posting/EditPost';
import run from '../../fixtures/run';
import { user1 } from '../../fixtures/users';

let startEditPost;
let startUpdateUser;
let startRemovePost;
let history;
let wrapper;

beforeEach(() => {
  startEditPost = jest.fn();
  startUpdateUser = jest.fn();
  startRemovePost = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(<EditPost
    post={run.posts[2].content}
    startEditPost={startEditPost}
    startUpdateUser={startUpdateUser}
    startRemovePost={startRemovePost}
    history={history}
    preferences={user1}
  />);
});

test('should render EditPost component properly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle onRemove', () => {
  wrapper.find('button').simulate('click');
  expect(startRemovePost).toHaveBeenCalled();
  expect(history.push).toHaveBeenLastCalledWith('/dashboard');
});

test('should handle onSubmit edit post', () => {
  wrapper.find('PostForm').prop('onSubmit')(run.posts[2]);
  expect(startEditPost).toHaveBeenLastCalledWith(run.posts[2].content.id, run.posts[2]);
  expect(history.push).toHaveBeenLastCalledWith('/dashboard');
});
