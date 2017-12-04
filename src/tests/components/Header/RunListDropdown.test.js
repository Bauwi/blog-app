import React from 'react';
import { shallow, mount } from 'enzyme';
import { RunListDropdown } from '../../../components/header/RunListDropdown';
import run from '../../fixtures/run';
import { MemoryRouter } from 'react-router-dom';

test('should render RunListDropdown properly', () => {
  const wrapper = shallow(<RunListDropdown setCurrentPostRun={() => {}} startResetRun={() => {}} />);
  expect(wrapper).toMatchSnapshot();
});

// test('should call startResetRun on reset button click', () => {
//   const startResetRun = jest.fn();
//   const wrapper = shallow(<RunListDropdown posts={run.posts} setCurrentPostRun={() => {}} startResetRun={startResetRun} />);

//   wrapper
//     .find('button')
//     .at(1)
//     .simulate('click');

//   expect(startResetRun).toHaveBeenCalled();
// });

// test('calls "handleResetClick()" on button click', () => {
//   const wrapper = mount(<MemoryRouter>
//     <RunListDropdown posts={run.posts} setCurrentPostRun={() => {}} startResetRun={() => {}} />
//   </MemoryRouter>);
//   const spy = jest.spyOn(wrapper.instance(), 'handleResetClick');
//   wrapper.update();
//   wrapper
//     .find('button')
//     .at(1)
//     .simulate('click');
//   expect(spy).toHaveBeenCalled();
// });
