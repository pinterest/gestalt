// @flow strict
import React from 'react';
import { create } from 'react-test-renderer';
import Datapoint from './Datapoint.js';

describe('Datapoint', () => {
  it('renders', () => {
    const tree = create(
      <Datapoint
        title="Title"
        value="1M"
        trend={{ value: 30, accessibilityLabel: 'Value change icon accessibility label' }}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an accessibility label', () => {
    const tree = create(
      <Datapoint
        title="Title"
        value="1M"
        trend={{ value: 30, accessibilityLabel: 'Value change icon accessibility label' }}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
