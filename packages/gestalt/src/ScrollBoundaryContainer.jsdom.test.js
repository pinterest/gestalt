// @flow strict
import { createRef } from 'react';
import { render } from '@testing-library/react';
import ScrollBoundaryContainer from './ScrollBoundaryContainer.js';
import { useScrollBoundaryContainer } from './contexts/ScrollBoundaryContainer.js';
import Box from './Box.js';

describe('ScrollBoundaryContainer', () => {
  it('renders successfully', () => {
    const ref = createRef();

    const { getByTestId } = render(
      <ScrollBoundaryContainer overflow="scroll">
        <Box data-test-id="childrenId" ref={ref} />
      </ScrollBoundaryContainer>,
    );

    expect(getByTestId('childrenId')).toBeTruthy();
  });

  it('passes default ScrollBoundaryContainer props through context correctly', () => {
    const scrollBoundaryContainer = createRef();

    function TestBox() {
      const { scrollBoundaryContainerRef } = useScrollBoundaryContainer();

      scrollBoundaryContainer.current = scrollBoundaryContainerRef;

      return <Box />;
    }

    render(
      <ScrollBoundaryContainer>
        <TestBox />
      </ScrollBoundaryContainer>,
    );

    // scrollBoundaryContainer.current is a div tag
    expect(scrollBoundaryContainer.current instanceof HTMLDivElement).toEqual(true);
    expect(scrollBoundaryContainer.current?.className.includes('relative')).toBe(true);
    expect(scrollBoundaryContainer.current?.className.includes('paddingX0')).toBe(true);
    expect(scrollBoundaryContainer.current?.className.includes('paddingX0')).toBe(true);
    expect(scrollBoundaryContainer.current?.className.includes('overflowAuto')).toBe(true);
    expect(scrollBoundaryContainer.current?.style.height).toEqual('100%');
  });

  it('passes custom ScrollBoundaryContainer props through context correctly', () => {
    const scrollBoundaryContainer = createRef();

    function TestBox() {
      const { scrollBoundaryContainerRef } = useScrollBoundaryContainer();

      scrollBoundaryContainer.current = scrollBoundaryContainerRef;

      return <Box />;
    }

    render(
      <ScrollBoundaryContainer height={100} overflow="scroll">
        <TestBox />
      </ScrollBoundaryContainer>,
    );

    // scrollBoundaryContainer.current is a div tag
    expect(scrollBoundaryContainer.current instanceof HTMLDivElement).toEqual(true);
    expect(scrollBoundaryContainer.current?.className.includes('overflowScroll')).toBe(true);
    expect(scrollBoundaryContainer.current?.style.height).toEqual('100px');
  });
});
