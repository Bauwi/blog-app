import React from 'react';
import { shallow } from 'enzyme';
import RunRead from '../../../components/run/RunRead';
import run from '../../fixtures/run';

test('should render ReadPost component correctly', () => {
  const wrapper = shallow(<RunRead current={run.posts[0]} startUpdateRunPostToAlreadyRead={() => {}} />);
  expect(wrapper).toMatchSnapshot();
});

// need to find a way to mock scrolling bottom to test if startUpdateRun.. has been called properly
