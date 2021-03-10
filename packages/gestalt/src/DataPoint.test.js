// @flow strict
import React from 'react';
import { create } from 'react-test-renderer';
import DataPoint from './DataPoint.js';

describe('DataPoint', () => {
  it('renders', () => {
    const tree = create(
      <DataPoint
        infoIconAccessibilityLabel="Info icon accessibility label"
        valuePercentChangeIconAccessibilityLabel="Value change icon accessibility label"
        title="Title"
        value="1M"
        valuePercentChange={30}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an accessibility label', () => {
    const tree = create(<DataPoint accessibilityLabel="Test Accessibility Label" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
