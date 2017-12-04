import React from 'react';
import { shallow } from 'enzyme';
import UserCard from '../../components/UserCard';
import { user2 } from '../fixtures/users';
import run from '../fixtures/run';

test('should render UserCard component properly when post not provided', () => {
  const wrapper = shallow(<UserCard author={user2} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render UserCard component properly when post provided', () => {
  const wrapper = shallow(<UserCard author={user2} post={run.posts[1].content} />);
  expect(wrapper).toMatchSnapshot();
});
