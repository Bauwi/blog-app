import React from 'react';
import { shallow } from 'enzyme';
import AuthorSummaryList from '../../../components/reading/AuthorSummaryList';
import run from '../../fixtures/run';

const posts = run.posts.map(post => post.content);

test('should render AuthorSummaryList component properly', () => {
  const wrapper = shallow(<AuthorSummaryList posts={posts} />);
  expect(wrapper).toMatchSnapshot();
});
