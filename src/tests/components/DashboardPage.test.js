import React from 'react';
import { shallow } from 'enzyme';
import { DashboardPage } from '../../components/posting/DashboardPage';
import { user1 } from '../fixtures/users';

test('should render DashboardPage component', () => {
  const wrapper = shallow(<DashboardPage preferences={user1} userId="123abc" />);
  expect(wrapper).toMatchSnapshot();
});
