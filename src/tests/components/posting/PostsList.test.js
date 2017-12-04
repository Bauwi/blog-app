import React from 'react';
import { shallow, mount } from 'enzyme';
import { PostsList } from '../../../components/posting/PostsList';
import run from '../../fixtures/run';

const posts = run.posts.map(post => post.content);

test('should render PostsLists component correctly on loading', () => {
  // const startSetPosts = jest.fn();
  // const sortByDate = jest.fn()
  const wrapper = shallow(<PostsList isLoading posts={posts} startSetPosts={() => {}} sortByDate={() => {}} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render PostsLists component correctly after loading', () => {
  const wrapper = shallow(<PostsList isLoading={false} posts={posts} startSetPosts={() => {}} sortByDate={() => {}} />);
  expect(wrapper).toMatchSnapshot();
});

test('should call sortByDate on mount', () => {
  const sortByDate = jest.fn();
  const wrapper = shallow(<PostsList isLoading={false} posts={posts} startSetPosts={() => {}} sortByDate={sortByDate} />);
  expect(sortByDate).toHaveBeenCalled();
});

// test('should call startSetPosts on mount', () => {
//   const startSetPosts = jest.fn();
//   const wrapper = mount(<PostsList posts={posts} startSetPosts={startSetPosts} sortByDate={() => {}} />);
//   ReactTestUtils.Simulate.scroll(wrapper, { deltaY: 500 });
//   wrapper.simulate('scroll');
//   expect(startSetPosts).toHaveBeenCalled();
// });
