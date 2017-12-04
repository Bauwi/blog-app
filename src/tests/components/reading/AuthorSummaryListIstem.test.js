import React from 'react';
import { shallow } from 'enzyme';
import AuthorSummaryListItem from '../../../components/reading/AuthorSummaryListItem';
import run from '../../fixtures/run';

const posts = run.posts.map(post => post.content);

test('should render AuthorSummaryListItem component properly', () => {
  const wrapper = shallow(<AuthorSummaryListItem post={posts[1]} />);
  expect(wrapper).toMatchSnapshot();
});
