// @flow strict
import React from 'react';
import { create } from 'react-test-renderer';
import PageHeader from './PageHeader.js';

describe('PageHeader', () => {
  it('renders', () => {
    const tree = create(<PageHeader name="" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an accessibility label', () => {
    const tree = create(<PageHeader accessibilityLabel="Test Accessibility Label" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
