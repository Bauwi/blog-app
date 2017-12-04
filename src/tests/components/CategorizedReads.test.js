import React from 'react';
import { shallow } from 'enzyme';
import { CategorizedReads } from '../../components/CategorizedReads';
import run from '../fixtures/run';

const posts = run.posts.map(post => post.content);

test('should render CategorizedReads component properly', () => {
  const wrapper = shallow(<CategorizedReads
    readings={posts}
    category="music"
    isLoading={false}
    startSetPostsSample={() => {}}
  />);
  expect(wrapper).toMatchSnapshot();
});

test('should render CategorizedReads component properly on loading', () => {
  const wrapper = shallow(<CategorizedReads readings={posts} category="music" isLoading startSetPostsSample={() => {}} />);
  expect(wrapper).toMatchSnapshot();
});

test('should call startSetPostsSample on mount', () => {
  const startSetPostsSample = jest.fn();
  const wrapper = shallow(<CategorizedReads
    readings={posts}
    category="music"
    isLoading={false}
    startSetPostsSample={startSetPostsSample}
  />);
  expect(startSetPostsSample).toHaveBeenCalled();
});
