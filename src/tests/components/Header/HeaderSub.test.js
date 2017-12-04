import React from 'react';
import { shallow } from 'enzyme';
import HeaderSub from '../../../components/header/HeaderSub';

test('should render HeaderSub correctly', () => {
  const wrapper = shallow(<HeaderSub />);

  expect(wrapper).toMatchSnapshot();
});
