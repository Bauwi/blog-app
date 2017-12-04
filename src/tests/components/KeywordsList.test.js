import React from 'react';
import { shallow } from 'enzyme';
import KeywordsList from '../../components/KeywordsList';
import run from '../fixtures/run';

const keywords = run.posts[1].content.keywords;

test('should render KeywordsList component properly', () => {
  const wrapper = shallow(<KeywordsList keywords={keywords} />);
  expect(wrapper).toMatchSnapshot();
});
