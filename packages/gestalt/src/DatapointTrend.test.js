// @flow strict
import React from 'react';
import { create } from 'react-test-renderer';
import DatapointTrend from './DatapointTrend.js';

describe('DatapointTrend', () => {
  it('renders', () => {
    const tree = create(
      <DatapointTrend
        iconAccessibilityLabel="Value change icon accessibility label"
        value={30}
        sentiment="good"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an accessibility label', () => {
    const tree = create(
      <DatapointTrend iconAccessibilityLabel="Value change icon accessibility label" value={30} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
