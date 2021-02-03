/**
 * ScrollableContainer is an optional wrapper component that ensures that anchor-based
 * components such as Flyout, Tooltip, Dropdown, and Typeahead, are  correctly positioned inside
 * scrolling containers.
 *
 * Note that this component requires ScrollableContainerProvider to store in context a node ref that
 * can be accessed by children components (Layer, Controller, and Contents) via getContainerNode() in * utils/positioningUtils.js
 *
 * By building-in ScrollableContainerProviders into ScrollableContainer, we override parent
 * ScrollableContainerProviders so that each context only has one ScrollableContainer.
 * */

// @flow strict
import React, { useRef, type Node, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  ScrollableContainerProvider,
  useScrollableContainer,
} from './contexts/ScrollableContainer.js';
import Box from './Box.js';
import { type Dimension, DimensionPropType } from './boxTypes.js';

type ScrollableOverflow = 'scroll' | 'scrollX' | 'scrollY' | 'auto';

type Props = {|
  children: Node,
  height?: Dimension,
  overflow?: ScrollableOverflow,
|};

function ScrollableContainer({ children, height = '100%', overflow = 'auto' }: Props): Node {
  const { addRef } = useScrollableContainer();
  const anchorRef = useRef<?HTMLDivElement>(null);

  useEffect(() => {
    if (anchorRef.current) {
      const ref = anchorRef.current;
      addRef(ref);
    }
  }, [addRef]);

  return (
    <Box height={height} overflow={overflow} position="relative" ref={anchorRef}>
      {children}
    </Box>
  );
}

const ScrollableContainerWithProvider = (passthroughProps: Props): Node => (
  <ScrollableContainerProvider>
    <ScrollableContainer {...passthroughProps} />
  </ScrollableContainerProvider>
);

ScrollableContainerWithProvider.displayName = ScrollableContainer;

export default ScrollableContainerWithProvider;

const ScrollableOverflowPropType: React$PropType$Primitive<ScrollableOverflow> = PropTypes.oneOf([
  'scroll',
  'scrollX',
  'scrollY',
  'auto',
]);

ScrollableContainer.propTypes = {
  children: PropTypes.node.isRequired,
  height: DimensionPropType,
  overflow: ScrollableOverflowPropType,
};
