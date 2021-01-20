// @flow strict
import React, { useRef, type Node, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useScrollableBoxStore } from './contexts/ScrollableBoxStore.js';
import { type Dimension, DimensionPropType } from './boxTypes.js';

type Props = {|
  children?: Node,
  height?: Dimension,
|};

export default function ScrollableBox({ children, height }: Props): Node {
  const { addRef, removeRef } = useScrollableBoxStore();
  const anchorRef = useRef<?HTMLDivElement>(null);

  useEffect(() => {
    if (anchorRef.current) {
      const ref = anchorRef.current;
      addRef(ref);
      return () => {
        removeRef(ref);
      };
    }
    return undefined;
  }, [addRef, removeRef]);

  return (
    <div
      ref={anchorRef}
      style={{
        height,
        position: 'relative',
        overflow: 'auto',
      }}
    >
      {children}
    </div>
  );
}

ScrollableBox.propTypes = {
  children: PropTypes.node,
  height: DimensionPropType,
};
