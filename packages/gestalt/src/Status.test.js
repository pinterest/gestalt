// @flow strict
import React from 'react';
import { create } from 'react-test-renderer';
import Status from './Status.js';

describe('Status', () => {
  it('renders', () => {
    const tree = create(<Status type="unstarted" accessibilityLabel="Unstarted" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an accessibility label', () => {
    const tree = create(<Status type="unstarted" accessibilityLabel="Unstarted" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
