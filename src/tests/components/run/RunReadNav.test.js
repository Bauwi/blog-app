import React from 'react';
import { shallow } from 'enzyme';
import { RunReadNav } from '../../../components/run/RunReadNav';
import run from '../../fixtures/run';

test('should render RunReadNav properly', () => {
  const wrapper = shallow(<RunReadNav
    currentRead={run.posts[1].content}
    previousRead={run.posts[0].content}
    nextRead={run.posts[2].content}
  />);
  expect(wrapper).toMatchSnapshot();
});
