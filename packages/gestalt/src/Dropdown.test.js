// @flow strict
import React from 'react';
import { create } from 'react-test-renderer';
import Dropdown from './Dropdown.js';

describe('Dropdown', () => {
  it('renders', () => {
    const tree = create(<Dropdown name="" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an accessibility label', () => {
    const tree = create(
      <Dropdown accessibilityLabel="Test Accessibility Label" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
