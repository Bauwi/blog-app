import React from 'react';
import { shallow } from 'enzyme';
import { RunSummaryHeader } from '../../../components/run/RunSummaryHeader';
import run, { runAlt } from '../../fixtures/run';

test('should render RunSummaryHeader component properly', () => {
  const wrapper = shallow(<RunSummaryHeader
    run={run}
    startSetCurrentPostRun={() => {}}
    startResetRun={() => {}}
    startCleanRun={() => {}}
    noUnreadPostWarning={() => {}}
  />);
  expect(wrapper).toMatchSnapshot();
});

test('should show error if resume click when no post unread', () => {
  const noUnreadPostWarning = jest.fn();
  // const history = { push: jest.fn() };
  // const setCurrentPostRun = jest.fn()
  const wrapper = shallow(<RunSummaryHeader
    run={runAlt}
    setCurrentPostRun={() => {}}
    startResetRun={() => {}}
    startCleanRun={() => {}}
    noUnreadPostWarning={noUnreadPostWarning}
  />);
  wrapper
    .find('button')
    .at(0)
    .simulate('click');

  expect(noUnreadPostWarning).toHaveBeenCalled();
});

test('should redirect to first unread post if there is one', () => {
  const history = { push: jest.fn() };
  const setCurrentPostRun = jest.fn();
  const wrapper = shallow(<RunSummaryHeader
    run={run}
    setCurrentPostRun={setCurrentPostRun}
    startResetRun={() => {}}
    startCleanRun={() => {}}
    history={history}
    noUnreadPostWarning={() => {}}
  />);
  wrapper
    .find('button')
    .at(0)
    .simulate('click');

  expect(history.push).toHaveBeenLastCalledWith('/run/start');
  expect(setCurrentPostRun).toHaveBeenLastCalledWith(run.posts[1].content.id);
});

test('should call startCleanRun on click', () => {
  const alreadyRead = run.posts.filter(post => post.state === 'read').map(post => post.DBid);
  const startCleanRun = jest.fn();
  const wrapper = shallow(<RunSummaryHeader
    run={run}
    setCurrentPostRun={() => {}}
    startResetRun={() => {}}
    startCleanRun={startCleanRun}
    history={() => {}}
    noUnreadPostWarning={() => {}}
  />);
  wrapper
    .find('button')
    .at(1)
    .simulate('click');

  expect(startCleanRun).toHaveBeenLastCalledWith(alreadyRead);
});

test('should call startResetRun on click', () => {
  const startResetRun = jest.fn();
  const wrapper = shallow(<RunSummaryHeader
    run={run}
    setCurrentPostRun={() => {}}
    startResetRun={startResetRun}
    startCleanRun={() => {}}
    history={() => {}}
    noUnreadPostWarning={() => {}}
  />);
  wrapper
    .find('button')
    .at(2)
    .simulate('click');

  expect(startResetRun).toHaveBeenCalled();
});
