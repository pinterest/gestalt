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
    const props = { height: 200, overflow: 'scroll' };

    const component = create(
      <ScrollableContainer {...props}>
        <Box />
      </ScrollableContainer>,
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    const instance = component.root;
    const element = instance.findByType('div');
    expect(element.props.className.includes('overflowScroll')).toBe(true);
    expect(element.props.style.height).toEqual(200);
  });
});
