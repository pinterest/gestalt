/* eslint-env jest */
import React from 'react';
import { create } from 'react-test-renderer';
import Text from './Text';

test('<Text>', () => {
  const tree = create(<Text />).toJSON();
  expect(tree).toMatchSnapshot();
});
