import React from 'react';
import { shallow } from 'enzyme';
import { AuthorSummary } from '../../../components/reading/AuthorSummary';
import run from '../../fixtures/run';

const posts = run.posts.map(post => post.content);

test('should render AuthorSummary component properly', () => {
  const wrapper = shallow(<AuthorSummary
    isLoading={false}
    userId="1"
    posts={posts}
    startSetSpecificUserPosts={() => {}}
  />);
  expect(wrapper).toMatchSnapshot();
});

test('should render AuthorSummary component properly when loading', () => {
  const wrapper = shallow(<AuthorSummary isLoading userId="1" posts={posts} startSetSpecificUserPosts={() => {}} />);
  expect(wrapper).toMatchSnapshot();
});

test('should call startSetSpecificUserPosts on mount', () => {
  const startSetSpecificUserPosts = jest.fn();
  const wrapper = shallow(<AuthorSummary
    isLoading={false}
    userId="1"
    posts={posts}
    startSetSpecificUserPosts={startSetSpecificUserPosts}
  />);
  expect(startSetSpecificUserPosts).toHaveBeenLastCalledWith('1');
});
