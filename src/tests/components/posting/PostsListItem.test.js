import React from 'react';
import { shallow } from 'enzyme';
import PostsListItem from '../../../components/posting/PostsListItem';
import run from '../../fixtures/run';

test('should render PostsListItem component properly', () => {
  const wrapper = shallow(<PostsListItem {...run.posts[1].content} />);
  expect(wrapper).toMatchSnapshot();
});
