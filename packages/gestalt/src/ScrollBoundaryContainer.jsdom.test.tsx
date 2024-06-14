import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import Box from './Box';
import { useScrollBoundaryContainer } from './contexts/ScrollBoundaryContainerProvider';
import ScrollBoundaryContainer from './ScrollBoundaryContainer';

describe('ScrollBoundaryContainer', () => {
  it('renders successfully', () => {
    const ref = createRef<HTMLElement>();

    render(
      <ScrollBoundaryContainer overflow="scroll">
        <Box ref={ref} data-test-id="childrenId" />
      </ScrollBoundaryContainer>,
    );

    expect(screen.getByTestId('childrenId')).toBeTruthy();
  });

  it('passes default ScrollBoundaryContainer props through context correctly', () => {
    const scrollBoundaryContainer = createRef<undefined | HTMLElement>();

    function TestBox() {
      const { scrollBoundaryContainerRef } = useScrollBoundaryContainer();

      // @ts-expect-error - TS2540 - Cannot assign to 'current' because it is a read-only property.
      // eslint-disable-next-line react-compiler/react-compiler
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
    const scrollBoundaryContainer = createRef<undefined | HTMLElement>();

    function TestBox() {
      const { scrollBoundaryContainerRef } = useScrollBoundaryContainer();

      // @ts-expect-error - TS2540 - Cannot assign to 'current' because it is a read-only property.
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
