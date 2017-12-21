import React from 'react';
import { shallow } from 'enzyme';
import { RunListItem } from '../../../components/run/RunListItem';
import run from '../../fixtures/run';

test('should render RunListItem properly if not read yet', () => {
  const wrapper = shallow(<RunListItem state={run.posts[1].state} post={run.posts[1]} setCurrentPostRun={() => {}} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render RunListItem properly if already read', () => {
  const wrapper = shallow(<RunListItem state={run.posts[0].state} post={run.posts[0]} setCurrentPostRun={() => {}} />);
  expect(wrapper).toMatchSnapshot();
});

test('should call setCurrentPostRun and redirect if clicked', () => {
  const setCurrentPostRun = jest.fn();
  const history = { push: jest.fn() };
  const wrapper = shallow(<RunListItem
    state={run.posts[0].state}
    post={run.posts[0]}
    history={history}
    setCurrentPostRun={setCurrentPostRun}
  />);
  wrapper.find('.inline-list-item__infos').simulate('click');
  expect(history.push).toHaveBeenLastCalledWith('/run/start');
  expect(setCurrentPostRun).toHaveBeenLastCalledWith(run.posts[0].content.id);
});
