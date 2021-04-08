// @flow strict
import React from 'react';
import { create } from 'react-test-renderer';
import Datapoint from './Datapoint.js';

describe('DataPoint', () => {
  it('renders', () => {
    const tree = create(
      <Datapoint
        percentChangeAccessibilityLabel="Value change icon accessibility label"
        title="Title"
        value="1M"
        percentChange={30}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an accessibility label', () => {
    const tree = create(
      <Datapoint
        percentChangeAccessibilityLabel="Value change icon accessibility label"
        title="Title"
        value="1M"
        percentChange={30}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
