// @flow strict
import React from 'react';
import { create } from 'react-test-renderer';
import AvatarGroup from './AvatarGroup.js';

describe('AvatarGroup', () => {
  it('renders', () => {
    const tree = create(<AvatarGroup name="" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an accessibility label', () => {
    const tree = create(<AvatarGroup accessibilityLabel="Test Accessibility Label" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
