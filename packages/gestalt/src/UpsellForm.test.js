// @flow strict
import React from 'react';
import { create } from 'react-test-renderer';
import UpsellForm from './UpsellForm.js';

describe('UpsellForm', () => {
  it('renders', () => {
    const tree = create(<UpsellForm name="" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an accessibility label', () => {
    const tree = create(<UpsellForm accessibilityLabel="Test Accessibility Label" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
