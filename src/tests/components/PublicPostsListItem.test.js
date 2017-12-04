import React from 'react';
import { shallow } from 'enzyme';
import { PublicPostsListItem } from '../../components/PublicPostsListItem';
import run from '../fixtures/run';

test('should render PublicPostsListItem component properly', () => {
  const wrapper = shallow(<PublicPostsListItem
    post={run.posts[1].content}
    run={run.posts}
    startAddPostToRun={() => {}}
    startRemovePostToRun={() => {}}
  />);
  expect(wrapper).toMatchSnapshot();
});

test('should call startAddPostToRun on click', () => {
  const startAddPostToRun = jest.fn();
  const success = jest.fn();
  const wrapper = shallow(<PublicPostsListItem
    post={run.posts[1].content}
    run={[]}
    startAddPostToRun={startAddPostToRun}
    startRemovePostToRun={() => {}}
    success={success}
    error={() => {}}
  />);
  wrapper
    .find('button')
    .at(0)
    .simulate('click');
  expect(success).toHaveBeenCalled();
  expect(startAddPostToRun).toHaveBeenLastCalledWith({
    content: run.posts[1].content,
    state: 'unread'
  });
});

test('should call startRemovePostToRun on click', () => {
  const startRemovePostToRun = jest.fn();
  const wrapper = shallow(<PublicPostsListItem
    post={run.posts[1].content}
    run={run.posts}
    startAddPostToRun={() => {}}
    startRemovePostToRun={startRemovePostToRun}
    success={() => {}}
    error={() => {}}
    isInRun
    DBid="DBid"
  />);
  wrapper
    .find('button')
    .at(0)
    .simulate('click');
  expect(startRemovePostToRun).toHaveBeenLastCalledWith(run.posts[1].content.id, 'DBid');
});

test('should call error if run length is higher than 20', () => {
  const runTwenty = [];
  for (let i = 0; i <= 20; i += 1) {
    runTwenty.push({});
  }
  const error = jest.fn();
  const wrapper = shallow(<PublicPostsListItem
    post={run.posts[1].content}
    run={runTwenty}
    startAddPostToRun={() => {}}
    startRemovePostToRun={() => {}}
    success={() => {}}
    error={error}
  />);
  wrapper
    .find('button')
    .at(0)
    .simulate('click');
  expect(error).toHaveBeenCalled();
});
