/**
 * ScrollableContainer is an optional wrapper component that ensures that anchor-based
 * components such as Flyout, Tooltip, Dropdown, and Typeahead, are  correctly positioned inside
 * scrolling containers.
 *
 * Note that this component requires ScrollableContainerProvider to store in context a node ref that
 * can be accessed by children components (Layer, Controller, and Contents) via getContainerNode() in * utils/positioningUtils.js
 *
 * By building ScrollableContainerProviders into ScrollableContainer, we override parent
 * ScrollableContainerProviders so that each context only has one ScrollableContainer.
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
  ScrollableContainerProvider,
  useScrollableContainer,
} from './contexts/ScrollableContainer.js';
import Box from './Box.js';
import { type Dimension, DimensionPropType, type Padding, PaddingPropType } from './boxTypes.js';

type ScrollableOverflow = 'scroll' | 'scrollX' | 'scrollY' | 'auto';

type Props = {|
  children: Node,
  height?: Dimension,
  overflow?: ScrollableOverflow,
|};

type InternalProps = {|
  children?: Node,
  height?: Dimension,
  onScroll?: () => void,
  overflow?: ScrollableOverflow,
  padding?: Padding,
|};

// ScrollableContainerWithForwardRef is the ScrollableContainer to be used internally, within scrollable components (e. Modal, Sheet).
// It has an extended API with private props (onScroll, padding, and ref) to maintain border shadows in the component main content container.
const ScrollableContainerWithForwardRef: AbstractComponent<
  InternalProps,
  HTMLDivElement,
> = forwardRef<InternalProps, HTMLDivElement>(function ScrollableContainer(
  { children, onScroll, padding, height = '100%', overflow = 'auto' },
  ref,
): Node {
  const { addRef } = useScrollableContainer();
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

// ScrollableContainerWithProvider is the ScrollableContainer to exposed to the Gestalt library, with a limited API.
const ScrollableContainerWithProvider = (passthroughProps: Props): Node => (
  <ScrollableContainerProvider>
    <ScrollableContainerWithForwardRef {...passthroughProps} />
  </ScrollableContainerProvider>
);

ScrollableContainerWithForwardRef.displayName = 'InternalScrollableContainer';

ScrollableContainerWithProvider.displayName = 'ScrollableContainer';

export { ScrollableContainerWithForwardRef };

export default ScrollableContainerWithProvider;

const ScrollableOverflowPropType: React$PropType$Primitive<ScrollableOverflow> = PropTypes.oneOf([
  'scroll',
  'scrollX',
  'scrollY',
  'auto',
]);

// $FlowFixMe[prop-missing]
ScrollableContainerWithForwardRef.propTypes = {
  children: PropTypes.node,
  onScroll: PropTypes.func,
  padding: PaddingPropType,
  height: DimensionPropType,
  overflow: ScrollableOverflowPropType,
};
ScrollableContainerWithProvider.propTypes = {
  children: PropTypes.node.isRequired,
  height: DimensionPropType,
  overflow: ScrollableOverflowPropType,
};
