// @flow strict
import {
  type AbstractComponent,
  forwardRef,
  type Node as ReactNode,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import Box from '../Box';
import { type Dimension, type Padding } from '../boxTypes';
import { useScrollBoundaryContainer } from '../contexts/ScrollBoundaryContainerProvider';

type ScrollBoundaryContainerOverflow = 'scroll' | 'scrollX' | 'scrollY' | 'auto' | 'visible';

type InternalProps = {
  children?: ReactNode,
  includesFooter?: boolean,
  height?: Dimension,
  onScroll?: () => void,
  overflow?: ScrollBoundaryContainerOverflow,
  padding?: Padding,
};

// ScrollBoundaryContainerWithForwardRef is the ScrollBoundaryContainer to be used internally, within components (e. Modal, OverlayPanel).
// It has an extended API with private props (onScroll, padding, and ref) to maintain border shadows in the component main content container.
const ScrollBoundaryContainerWithForwardRef: AbstractComponent<InternalProps, HTMLElement> =
  forwardRef<InternalProps, HTMLElement>(function ScrollBoundaryContainer(
    {
      children,
      onScroll,
      includesFooter,
      padding = 0,
      height = '100%',
      overflow = 'auto',
    }: InternalProps,
    ref,
  ): ReactNode {
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
        display={includesFooter ? 'flex' : undefined}
        direction={includesFooter ? 'column' : undefined}
        flex={onScroll || includesFooter ? 'grow' : undefined}
        height={height}
        overflow={includesFooter ? 'visible' : overflow}
        onScroll={onScroll}
        padding={padding}
        position="relative"
        ref={anchorRef}
        width={includesFooter ? '100%' : undefined}
      >
        {children}
      </Box>
    );
  });

ScrollBoundaryContainerWithForwardRef.displayName = 'InternalScrollBoundaryContainer';

export default ScrollBoundaryContainerWithForwardRef;
