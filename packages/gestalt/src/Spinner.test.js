// @flow
import React from 'react';
import { create } from 'react-test-renderer';
import Spinner from './Spinner.js';

const baseProps = {
  accessibilityLabel: 'Test',
  show: false, // default
};

test('Spinner does not render by default', () => {
  const tree = create(<Spinner {...baseProps} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Spinner renders when passed show', () => {
  const tree = create(<Spinner {...baseProps} show />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Spinner renders with no delay', () => {
  const tree = create(<Spinner {...baseProps} show delay={false} />).toJSON();
  expect(tree).toMatchSnapshot();
});
