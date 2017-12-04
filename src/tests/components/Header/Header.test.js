import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../../components/header/Header';

test('should render Header correctly', () => {
  const wrapper = shallow(<Header startLogout={() => {}} />);
  expect(wrapper).toMatchSnapshot();
});
