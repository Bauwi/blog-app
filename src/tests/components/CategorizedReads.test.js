import React from 'react';
import { shallow } from 'enzyme';
import { CategorizedReads } from '../../components/CategorizedReads';
import { posts } from '../fixtures/run';

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
