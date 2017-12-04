import React from 'react';
import { shallow } from 'enzyme';
import { HomeRead } from '../../../components/home/HomeRead';

test('should render HomeRead component properly', () => {
  const wrapper = shallow(<HomeRead categories={[]} startSetPostsSample={() => {}} />);
  expect(wrapper).toMatchSnapshot();
});

test('should have rendered custom categories properly', () => {
  const wrapper = shallow(<HomeRead categories={['alpha', 'beta', 'gamma']} startSetPostsSample={() => {}} />);

  expect(wrapper).toMatchSnapshot();
});
