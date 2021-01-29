// @flow strict
import React from 'react';
import { create } from 'react-test-renderer';
import ScrollableContainer from './ScrollableContainer.js';

describe('ScrollableContainer', () => {
  it('renders', () => {
    const tree = create(<ScrollableContainer name="" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an accessibility label', () => {
    const tree = create(<ScrollableContainer accessibilityLabel="Test Accessibility Label" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
