import React from 'react';
import { shallow } from 'enzyme';
import { LoginModal } from '../../../components/header/LoginModal';

test('should render LoginPage correctly', () => {
  const wrapper = shallow(<LoginModal startLoginWithGoogle={() => {}} startLoginWithGithub={() => {}} />);
  expect(wrapper).toMatchSnapshot();
});

test('should hide modal on mount', () => {
  const wrapper = shallow(<LoginModal startLoginWithGoogle={() => {}} startLoginWithGithub={() => {}} />);

  expect(wrapper.state().visible).toEqual(false);
});

test('should open modal on navbar button click', () => {
  const wrapper = shallow(<LoginModal startLoginWithGoogle={() => {}} startLoginWithGithub={() => {}} />);
  wrapper
    .find('button')
    .at(0)
    .simulate('click');

  expect(wrapper.state().visible).toEqual(true);
});

test('should call startLoginGoogle on Login With Google click', () => {
  const startLoginWithGoogle = jest.fn();
  const startLoginWithGithub = jest.fn();
  const wrapper = shallow(<LoginModal
    startLoginWithGoogle={startLoginWithGoogle}
    startLoginWithGithub={startLoginWithGithub}
  />);
  wrapper
    .find('button')
    .at(1)
    .simulate('click');

  expect(startLoginWithGithub).not.toHaveBeenCalled();
  expect(startLoginWithGoogle).toHaveBeenCalled();
});

test('should call startLoginGithub on Login With Github click', () => {
  const startLoginWithGoogle = jest.fn();
  const startLoginWithGithub = jest.fn();
  const wrapper = shallow(<LoginModal
    startLoginWithGoogle={startLoginWithGoogle}
    startLoginWithGithub={startLoginWithGithub}
  />);
  wrapper
    .find('button')
    .at(2)
    .simulate('click');
  expect(startLoginWithGoogle).not.toHaveBeenCalled();
  expect(startLoginWithGithub).toHaveBeenCalled();
});
