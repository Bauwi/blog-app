import React from 'react';
import { shallow } from 'enzyme';
import { PublicPostsList } from '../../components/PublicPostsList';
import run from '../fixtures/run';

const posts = run.posts.map(post => post.content);

test('should render PublicPostsList component properly', () => {
  const wrapper = shallow(<PublicPostsList posts={posts} isLoading={false} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render PublicPostsList component properly on loading', () => {
  const wrapper = shallow(<PublicPostsList posts={posts} isLoading />);
  expect(wrapper).toMatchSnapshot();
});

test('should render PublicPostsLists component properly when no post provided', () => {
  const wrapper = shallow(<PublicPostsList posts={[]} isLoading={false} />);
  expect(wrapper).toMatchSnapshot();
});
