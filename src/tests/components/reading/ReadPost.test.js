import React from 'react';
import { shallow } from 'enzyme';
import { ReadPost } from '../../../components/reading/ReadPost';
import run from '../../fixtures/run';
import { user2 } from '../../fixtures/users';

const posts = run.posts.map(post => post.content);

test('should render ReadPost component properly', () => {
  const wrapper = shallow(<ReadPost
    isLoading={false}
    post={posts[2]}
    postId="1"
    startUpPostStar={() => {}}
    startSetOnePost={() => {}}
  />);
  expect(wrapper).toMatchSnapshot();
});

test('should render ReadPost properly on loading', () => {
  const wrapper = shallow(<ReadPost
    isLoading
    post={posts[2]}
    postId="1"
    startUpPostStar={() => {}}
    startSetOnePost={() => {}}
  />);
  expect(wrapper).toMatchSnapshot();
});

test('should call startSetOnePost on mount', () => {
  const startSetOnePost = jest.fn();
  const wrapper = shallow(<ReadPost
    isLoading={false}
    post={posts[2]}
    postId="1"
    startUpPostStar={() => {}}
    startSetOnePost={startSetOnePost}
  />);
  expect(startSetOnePost).toHaveBeenLastCalledWith('1');
});

test('should call startUpPostStar on star click', () => {
  const startUpPostStar = jest.fn();
  const wrapper = shallow(<ReadPost
    isLoading={false}
    post={posts[2]}
    author={user2}
    postId="1"
    startUpPostStar={startUpPostStar}
    startSetOnePost={() => {}}
  />);
  wrapper.find('button').simulate('click');
  expect(startUpPostStar).toHaveBeenLastCalledWith('1', posts[2].authorId, user2.stars);
});
