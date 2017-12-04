import React from 'react';
import { shallow } from 'enzyme';
import { HeaderNavBar } from '../../../components/header/HeaderNavBar';
import { startLogout } from '../../../actions/auth';
import { startSetRunPosts } from '../../../actions/posts';

test('should render HeaderNavBar correctly', () => {
  const wrapper = shallow(<HeaderNavBar startLogout={() => {}} startSetRunPosts={() => {}} isAuthenticated />);
  expect(wrapper).toMatchSnapshot();
});

test('should call startLogout on button click', () => {
  const startLogout = jest.fn();
  const wrapper = shallow(<HeaderNavBar startLogout={startLogout} startSetRunPosts={() => {}} isAuthenticated />);
  wrapper.find('button').simulate('click');

  expect(startLogout).toHaveBeenCalled();
});

test('should call startSetRunPosts on mount', () => {
  const startSetRunPosts = jest.fn();
  const wrapper = shallow(<HeaderNavBar startLogout={() => {}} startSetRunPosts={startSetRunPosts} isAuthenticated />);

  expect(startSetRunPosts).toHaveBeenCalled();
});

test('should not call startSetRunPost if not authenticated', () => {
  const startSetRunPosts = jest.fn();
  const wrapper = shallow(<HeaderNavBar
    startLogout={() => {}}
    startSetRunPosts={startSetRunPosts}
    isAuthenticated={false}
  />);

  expect(startSetRunPosts).not.toHaveBeenCalled();
});
