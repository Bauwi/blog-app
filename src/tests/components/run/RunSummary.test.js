import React from 'react';
import { shallow } from 'enzyme';
import { RunSummary } from '../../../components/run/RunSummary';
import run from '../../fixtures/run';

test('should render RunSummary component properly', () => {
  const wrapper = shallow(<RunSummary run={run} />);
  expect(wrapper).toMatchSnapshot();
});
