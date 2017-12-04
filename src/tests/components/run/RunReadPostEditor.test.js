import React from 'react';
import { shallow } from 'enzyme';
import RunReadPostEditor from '../../../components/run/RunReadPostEditor';
import run from '../../fixtures/run';

const delta = { ops: [...run.posts[1].content.body] };

test('should render RunReadPostEditor component properly', () => {
  const wrapper = shallow(<RunReadPostEditor delta={delta} />);
  expect(wrapper).toMatchSnapshot();
});
