import React from 'react';
import { shallow } from 'enzyme';
import SmallLoader from '../../components/SmallLoader';

test('should render SmallLoader component properly', () => {
  const wrapper = shallow(<SmallLoader />);
  expect(wrapper).toMatchSnapshot();
});
