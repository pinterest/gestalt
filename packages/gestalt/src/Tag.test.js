// @flow strict
import React from 'react';
import { create } from 'react-test-renderer';
import Tag from './Tag.js';

describe('Tag', () => {
  it('renders', () => {
    const tree = create(
      <Tag
        text="New"
        onRemove={() => {}}
        removeIconAccessibilityLabel="Remove"
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a disabled tag', () => {
    const tree = create(<Tag text="New" disabled />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a tag with an error state', () => {
    const tree = create(
      <Tag
        text="New"
        onRemove={() => {}}
        removeIconAccessibilityLabel="Remove"
        errorMessage="Error"
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
