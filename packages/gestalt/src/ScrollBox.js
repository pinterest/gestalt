// @flow strict
import React, { type Node, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Box from './Box.js';
import Heading from './Heading.js';
import Icon from './Icon.js';
import IconButton from './IconButton.js';
import Button from './Button.js';
import Text from './Text.js';
import { useScroll } from './contexts/Scroll.js';
import { type AbstractEventHandler } from './AbstractEventHandler.js';
import styles from './Callout.css';


type Props = {
  children?: Node,
  height?: string,
};

export default function ScrollBox({ children, height }: Props): Node {
  const { addRef, removeRef } = useScroll();
  const anchorRef = React.useRef<?HTMLDivElement>(null);

  useEffect(() => {
    if (anchorRef.current) {
      const ref = anchorRef.current;
      addRef(ref);
      return () => {
        removeRef(ref);
      };
    }
  }, []);

  return (
    <div
      ref={anchorRef}
      style={{
        height,
        backgroundColor: "green",
        position: "relative",
        overflow: "auto"
      }}
    >
    {children}
  </div>
  );
}

ScrollBox.propTypes = {
  children: PropTypes.node,
  height: PropTypes.string,
};

