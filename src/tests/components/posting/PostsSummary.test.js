import React from 'react';
import { shallow } from 'enzyme';
import { PostsSummary } from '../../../components/posting/PostsSummary';
import run from '../../fixtures/run';

const posts = run.posts.map(post => post.content);

test('should render PostsSummary component properly with no post provided', () => {
  const wrapper = shallow(<PostsSummary totalUserPosts={0} selectedPosts={[]} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render PostsSummary component properly with multiple posts provided', () => {
  const wrapper = shallow(<PostsSummary totalUserPosts={3} selectedPosts={posts} />);
  expect(wrapper).toMatchSnapshot();
});
