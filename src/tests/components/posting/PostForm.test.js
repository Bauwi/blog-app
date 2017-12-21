import React from 'react';
import { shallow, mount } from 'enzyme';
import moment from 'moment';
import PostForm from '../../../components/posting/PostForm';
import { user2 } from '../../fixtures/users';
import run from '../../fixtures/run';

test('should render PostForm Component properly', () => {
  const wrapper = shallow(<PostForm author={user2} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render PostForm with correct data in', () => {
  const wrapper = shallow(<PostForm author={user2} post={run.posts[0].content} />);
  expect(wrapper).toMatchSnapshot();
});

test('should display an error message if invalid form submission', () => {
  const wrapper = shallow(<PostForm author={user2} />);
  wrapper.find('form').simulate('submit', { preventDefault: () => {} });
  expect(wrapper.state('error')).toBe(true);
});

test('should change keywords on keywords input change', () => {
  const value = 'banana, apple, orange';
  const wrapper = shallow(<PostForm author={user2} />);
  wrapper
    .find('input')
    .at(0)
    .simulate('change', {
      target: { value }
    });
  expect(wrapper.state().keywords).toBe(value);
});

test('should change title on title input change', () => {
  const value = 'new title';
  const wrapper = shallow(<PostForm author={user2} />);
  wrapper.find('TextArea').simulate('change', { target: { value } });
  expect(wrapper.state().title).toBe(value);
});

test('should call onSubmit prop with valid form submission', () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(<PostForm post={run.posts[0].content} author={user2} onSubmit={onSubmitSpy} />);
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  });
  expect(wrapper.state().error).toBe(false);
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    author: 'user2',
    cover: 'https://www.w3schools.com/w3css/img_fjords.jpg',
    miniCover: 'https://www.w3schools.com/w3css/img_fjords.jpg',
    title: 'Post 1 in Run',
    body: [{ text: 'This is the first Post in run', attributes: 'h1' }],
    keywords: 'red, red, green, blue',
    readingTime: 7,
    createdAt: 0
  });
});

// test('should change body on title', () => {
//   const value = { ops: [{ text: 'hello world !', attributes: 'h1' }] };
//   const wrapper = shallow(<PostForm author={user2} post={run.posts[1].content} />);
//   wrapper.find('Quill').simulate('change', { target });
//   expect(wrapper.state().bodyToEditor).toBe(value);
// });
