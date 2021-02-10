// @flow strict
import React, { createRef } from 'react';
import { render } from '@testing-library/react';
import ScrollableContainer from './ScrollableContainer.js';
import { useScrollableContainer } from './contexts/ScrollableContainer.js';
import Box from './Box.js';

describe('ScrollableContainer', () => {
  it('renders successfully', () => {
    const ref = createRef();

    const { getByTestId } = render(
      <ScrollableContainer overflow="scroll">
        <Box data-testid="childrenId" ref={ref} />
      </ScrollableContainer>,
    );

    expect(getByTestId('childrenId')).toBeTruthy();
  });

  it('passes default ScrollableContainer props through context correctly', () => {
    const scrollableContainer = createRef();

    const TestBox = () => {
      const { scrollableContainerRef } = useScrollableContainer();

      scrollableContainer.current = scrollableContainerRef;

      return <Box />;
    };

    render(
      <ScrollableContainer>
        <TestBox />
      </ScrollableContainer>,
    );

    // scrollableContainer.current is a div tag
    expect(scrollableContainer.current instanceof HTMLDivElement).toEqual(true);
    expect(scrollableContainer.current?.className.includes('relative')).toBe(true);
    expect(scrollableContainer.current?.className.includes('paddingX0')).toBe(true);
    expect(scrollableContainer.current?.className.includes('paddingX0')).toBe(true);
    expect(scrollableContainer.current?.className.includes('overflowAuto')).toBe(true);
    expect(scrollableContainer.current?.style.height).toEqual('100%');
  });

  it('passes custom ScrollableContainer props through context correctly', () => {
    const scrollableContainer = createRef();

    const TestBox = () => {
      const { scrollableContainerRef } = useScrollableContainer();

      scrollableContainer.current = scrollableContainerRef;

      return <Box />;
    };

    render(
      <ScrollableContainer height={100} overflow="scroll">
        <TestBox />
      </ScrollableContainer>,
    );

    // scrollableContainer.current is a div tag
    expect(scrollableContainer.current instanceof HTMLDivElement).toEqual(true);
    expect(scrollableContainer.current?.className.includes('overflowScroll')).toBe(true);
    expect(scrollableContainer.current?.style.height).toEqual('100px');
  });
});
