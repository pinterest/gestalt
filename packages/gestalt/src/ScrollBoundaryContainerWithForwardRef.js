// @flow strict
import type { Node, AbstractComponent } from 'react';

import { forwardRef, useEffect, useRef, useImperativeHandle } from 'react';
import { useScrollBoundaryContainer } from './contexts/ScrollBoundaryContainer.js';
import Box from './Box.js';
import { type Dimension, type Padding } from './boxTypes.js';

type ScrollBoundaryContainerOverflow = 'scroll' | 'scrollX' | 'scrollY' | 'auto';

type InternalProps = {|
  children?: Node,
  height?: Dimension,
  onScroll?: () => void,
  overflow?: ScrollBoundaryContainerOverflow,
  padding?: Padding,
|};

// ScrollBoundaryContainerWithForwardRef is the ScrollBoundaryContainer to be used internally, within components (e. Modal, Sheet).
// It has an extended API with private props (onScroll, padding, and ref) to maintain border shadows in the component main content container.
const ScrollBoundaryContainerWithForwardRef: AbstractComponent<InternalProps, HTMLElement> =
  forwardRef<InternalProps, HTMLElement>(function ScrollBoundaryContainer(
    { children, onScroll, padding = 0, height = '100%', overflow = 'auto' }: InternalProps,
    ref,
  ): Node {
    const { addRef } = useScrollBoundaryContainer();
    const anchorRef = useRef<HTMLElement | null>(null);
    // When using both forwardRef and innerRef, React.useimperativehandle() allows a parent component
    // that renders <Button ref={inputRef} /> to call inputRef.current.focus()
    useImperativeHandle(ref, () => anchorRef.current);

    useEffect(() => {
      if (anchorRef.current) {
        addRef(anchorRef.current);
      }
    }, [addRef]);
    return (
      <Box
        flex={onScroll ? 'grow' : undefined}
        height={height}
        overflow={overflow}
        onScroll={onScroll}
        padding={padding}
        position="relative"
        ref={anchorRef}
      >
        {children}
      </Box>
    );
  });

ScrollBoundaryContainerWithForwardRef.displayName = 'InternalScrollBoundaryContainer';

export default ScrollBoundaryContainerWithForwardRef;
