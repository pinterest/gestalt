// @flow strict
import React from 'react';
import { create } from 'react-test-renderer';
import ScrollableContainer from './ScrollableContainer.js';
import Box from './Box.js';

describe('ScrollableContainer', () => {
  it('renders', () => {
    const tree = create(
      <ScrollableContainer>
        <Box />
      </ScrollableContainer>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('ScrollableContainer correctly sets height and overflow props', () => {
    const tree = create(
      <ScrollableContainer height={200} overflow="scroll">
        <Box />
      </ScrollableContainer>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
