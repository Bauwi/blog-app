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
