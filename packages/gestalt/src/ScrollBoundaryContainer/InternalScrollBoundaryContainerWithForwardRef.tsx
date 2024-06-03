import { forwardRef, ReactNode, useEffect, useImperativeHandle, useRef } from 'react';
import Box from '../Box';
import { Dimension, Padding } from '../boxTypes';
import { useScrollBoundaryContainer } from '../contexts/ScrollBoundaryContainerProvider';

type ScrollBoundaryContainerOverflow = 'scroll' | 'scrollX' | 'scrollY' | 'auto' | 'visible';

type InternalProps = {
  children?: ReactNode;
  includesFooter?: boolean;
  height?: Dimension;
  onScroll?: () => void;
  overflow?: ScrollBoundaryContainerOverflow;
  padding?: Padding;
};

// ScrollBoundaryContainerWithForwardRef is the ScrollBoundaryContainer to be used internally, within components (e. Modal, OverlayPanel).
// It has an extended API with private props (onScroll, padding, and ref) to maintain border shadows in the component main content container.
const ScrollBoundaryContainerWithForwardRef = forwardRef<HTMLElement, InternalProps>(
  function ScrollBoundaryContainer(
    {
      children,
      onScroll,
      includesFooter,
      padding = 0,
      height = '100%',
      overflow = 'auto',
    }: InternalProps,
    ref,
  ) {
    const { addRef } = useScrollBoundaryContainer();
    const anchorRef = useRef<HTMLElement | null>(null);
    // When using both forwardRef and innerRef, React.useimperativehandle() allows a parent component
    // that renders <Button ref={inputRef} /> to call inputRef.current.focus()
    // @ts-expect-error - TS2322 - Type 'HTMLElement | null' is not assignable to type 'HTMLElement'.
    useImperativeHandle(ref, () => anchorRef.current);

    useEffect(() => {
      if (anchorRef.current) {
        addRef(anchorRef.current);
      }
    }, [addRef]);
    return (
      <Box
        ref={anchorRef}
        direction={includesFooter ? 'column' : undefined}
        display={includesFooter ? 'flex' : undefined}
        flex={onScroll || includesFooter ? 'grow' : undefined}
        height={height}
        onScroll={onScroll}
        overflow={includesFooter ? 'visible' : overflow}
        padding={padding}
        position="relative"
        width={includesFooter ? '100%' : undefined}
      >
        {children}
      </Box>
    );
  },
);

ScrollBoundaryContainerWithForwardRef.displayName = 'InternalScrollBoundaryContainer';

export default ScrollBoundaryContainerWithForwardRef;
