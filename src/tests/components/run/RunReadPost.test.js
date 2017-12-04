import React from 'react';
import { shallow } from 'enzyme';
import { RunReadPost } from '../../../components/run/RunReadPost';
import run from '../../fixtures/run';
import { user2 } from '../../fixtures/users';

test('should render RunReadPost component properly', () => {
  const wrapper = shallow(<RunReadPost
    isLoading={false}
    post={run.posts[0]}
    startSetAuthorFromUserId={() => {}}
    startUpPostStar={() => {}}
  />);
  expect(wrapper).toMatchSnapshot();
});

test('should render RunReadPost component properly on loading', () => {
  const wrapper = shallow(<RunReadPost
    isLoading
    post={run.posts[0]}
    startSetAuthorFromUserId={() => {}}
    startUpPostStar={() => {}}
  />);
  expect(wrapper).toMatchSnapshot();
});

test('should call startSetAuthorFromUserId on mount', () => {
  const startSetAuthorFromUserId = jest.fn();
  const wrapper = shallow(<RunReadPost
    isLoading
    post={run.posts[0]}
    startSetAuthorFromUserId={startSetAuthorFromUserId}
    startUpPostStar={() => {}}
  />);
  expect(startSetAuthorFromUserId).toHaveBeenLastCalledWith(run.posts[0].content.authorId);
});

test('should call startSetAuthorFromUserId on update', () => {
  const startSetAuthorFromUserId = jest.fn();
  const wrapper = shallow(<RunReadPost
    isLoading
    post={run.posts[0]}
    startSetAuthorFromUserId={startSetAuthorFromUserId}
    startUpPostStar={() => {}}
  />);
  wrapper.setProps({ post: run.posts[1] });
  expect(startSetAuthorFromUserId).toHaveBeenLastCalledWith(run.posts[1].content.authorId);
});

test('should call startUpPostStar on star click', () => {
  const startUpPostStar = jest.fn();
  const wrapper = shallow(<RunReadPost
    isLoading
    author={user2}
    post={run.posts[0]}
    startSetAuthorFromUserId={() => {}}
    startUpPostStar={startUpPostStar}
  />);
  setTimeout(() => {
    wrapper
      .find('button')
      .at(0)
      .simulate('click');
    expect(startUpPostStar).toHaveBeenLastCalledWith(
      run.posts[0].content.id,
      run.posts[0].content.authorId,
      user2.stars
    );
  }, 1000);
});
