import React from 'react';
import { shallow } from 'enzyme';
import { RunReadNavItem } from '../../../components/run/RunReadNavItem';
import run from '../../fixtures/run';

test('should render RunReadNavItem component properly', () => {
  const wrapper = shallow(<RunReadNavItem post={run.posts[2]} startSetCurrentPostRun={() => {}} />);
  expect(wrapper).toMatchSnapshot();
});
test('should render RunReadNavItem properly if empty', () => {
  const wrapper = shallow(<RunReadNavItem post={false} startSetCurrentPostRun={() => {}} />);
  expect(wrapper).toMatchSnapshot();
});

test('should call startSetCurrentPostRun after 100ms', () => {
  const startSetCurrentPostRun = jest.fn();
  const wrapper = shallow(<RunReadNavItem post={run.posts[2]} startSetCurrentPostRun={startSetCurrentPostRun} />);
  wrapper.simulate('click');
  setTimeout(() => {
    expect(startSetCurrentPostRun).toHaveBeenCalled();
  }, 100);
});

test('should not call startSetCurrentPostRun after less than 100ms', () => {
  const startSetCurrentPostRun = jest.fn();
  const wrapper = shallow(<RunReadNavItem post={run.posts[2]} startSetCurrentPostRun={startSetCurrentPostRun} />);
  wrapper.simulate('click');
  setTimeout(() => {
    expect(startSetCurrentPostRun).not.toHaveBeenCalled();
  }, 50);
});

test('should call scrollToTop on item click', () => {
  const wrapper = shallow(<RunReadNavItem post={run.posts[2]} startSetCurrentPostRun={() => {}} />);
  const scrollToTop = jest.spyOn(wrapper.instance(), 'scrollToTop');
  wrapper.update();
  wrapper.simulate('click');
  expect(scrollToTop).toHaveBeenCalled();
});
