import React from 'react';
import { shallow } from 'enzyme';
import RunList from '../../../components/run/RunList';
import run from '../../fixtures/run';

const posts = run.posts.map(post => post.content);

test('should render RunList properly if posts provided', () => {
  const wrapper = shallow(<RunList posts={posts} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render RunList properly if empty', () => {
  const wrapper = shallow(<RunList />);
  expect(wrapper).toMatchSnapshot();
});
