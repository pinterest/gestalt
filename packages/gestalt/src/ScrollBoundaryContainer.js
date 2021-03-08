/**
 * ScrollBoundaryContainer is an optional wrapper component that ensures that anchor-based
 * components such as Popover, Tooltip, Dropdown, and Typeahead, are  correctly positioned inside
 * scrolling containers.
 *
 * Note that this component requires ScrollBoundaryContainerProvider to store in context a node ref that
 * can be accessed by children components (Layer, Controller, and Contents) via getContainerNode() in * utils/positioningUtils.js
 *
 * By building ScrollBoundaryContainerProviders into ScrollBoundaryContainer, we override parent
 * ScrollBoundaryContainerProviders so that each context only has one ScrollBoundaryContainer.
 *
 *
 * */

// @flow strict
import React, {
  forwardRef,
  useEffect,
  useRef,
  useImperativeHandle,
  type Node,
  type AbstractComponent,
} from 'react';
import PropTypes from 'prop-types';
import {
  ScrollBoundaryContainerProvider,
  useScrollBoundaryContainer,
} from './contexts/ScrollBoundaryContainer.js';
import Box from './Box.js';
import { type Dimension, DimensionPropType, type Padding, PaddingPropType } from './boxTypes.js';

type ScrollBoundaryContainerOverflow = 'scroll' | 'scrollX' | 'scrollY' | 'auto';

type Props = {|
  children: Node,
  height?: Dimension,
  overflow?: ScrollBoundaryContainerOverflow,
|};

type InternalProps = {|
  children?: Node,
  height?: Dimension,
  onScroll?: () => void,
  overflow?: ScrollBoundaryContainerOverflow,
  padding?: Padding,
|};

// ScrollBoundaryContainerWithForwardRef is the ScrollBoundaryContainer to be used internally, within components (e. Modal, Sheet).
// It has an extended API with private props (onScroll, padding, and ref) to maintain border shadows in the component main content container.
const ScrollBoundaryContainerWithForwardRef: AbstractComponent<
  InternalProps,
  HTMLDivElement,
> = forwardRef<InternalProps, HTMLDivElement>(function ScrollBoundaryContainer(
  { children, onScroll, padding = 0, height = '100%', overflow = 'auto' },
  ref,
): Node {
  const { addRef } = useScrollBoundaryContainer();
  const anchorRef = useRef<HTMLDivElement | null>(null);
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

// ScrollBoundaryContainerWithProvider is the ScrollBoundaryContainer to exposed to the Gestalt library, with a limited API.
const ScrollBoundaryContainerWithProvider = (passthroughProps: Props): Node => (
  <ScrollBoundaryContainerProvider>
    <ScrollBoundaryContainerWithForwardRef {...passthroughProps} />
  </ScrollBoundaryContainerProvider>
);

ScrollBoundaryContainerWithForwardRef.displayName = 'InternalScrollBoundaryContainer';

ScrollBoundaryContainerWithProvider.displayName = 'ScrollBoundaryContainer';

export { ScrollBoundaryContainerWithForwardRef };

export default ScrollBoundaryContainerWithProvider;

const ScrollBoundaryContainerOverflowPropType: React$PropType$Primitive<ScrollBoundaryContainerOverflow> = PropTypes.oneOf(
  ['scroll', 'scrollX', 'scrollY', 'auto'],
);

// $FlowFixMe[prop-missing]
ScrollBoundaryContainerWithForwardRef.propTypes = {
  children: PropTypes.node,
  onScroll: PropTypes.func,
  padding: PaddingPropType,
  height: DimensionPropType,
  overflow: ScrollBoundaryContainerOverflowPropType,
};
ScrollBoundaryContainerWithProvider.propTypes = {
  children: PropTypes.node.isRequired,
  height: DimensionPropType,
  overflow: ScrollBoundaryContainerOverflowPropType,
};
