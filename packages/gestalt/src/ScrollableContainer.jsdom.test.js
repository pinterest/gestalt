// @flow strict
import React, { createRef } from 'react';
import { render } from '@testing-library/react';
import ScrollableContainer from './ScrollableContainer.js';
import { useScrollableContainer } from './contexts/ScrollableContainer.js';
import Box from './Box.js';

describe('ScrollableContainer', () => {
  it('renders correctly', () => {
    const ref = createRef();

    const TestBox = () => {
      const { addRef, scrollableContainerRef } = useScrollableContainer();
      return addRef && scrollableContainerRef ? <Box ref={ref} /> : null;
    };

    render(
      <ScrollableContainer>
        <TestBox />
      </ScrollableContainer>,
    );
    expect(ref.current instanceof HTMLDivElement).toEqual(true);
  });

  it('stores ScrollableContainer node in scrollableContainerRef in context', () => {
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
    expect(scrollableContainer.current instanceof HTMLDivElement).toEqual(true);
  });
});
