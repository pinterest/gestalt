// @flow strict
import { type Node } from 'react';
import classnames from 'classnames';
import { type Size, SIZE_MAP } from './constants.js';
import styles from '../AvatarGroup.css';
import Box from '../Box.js';
import { FixedZIndex } from '../zIndex.js';

type Props = {
  children: Node,
  hovered: boolean,
  size: Size,
};

// HoverOverlay adds a pseudo-element on hover so that avatars get covered in a darker wash individually.

export default function AvatarGroupHoverOverlay({ children, hovered, size }: Props): Node {
  return (
    <Box
      height={SIZE_MAP[size]}
      // position="relative" is required to create a stacking context so that pseudo-elements can be positioned in front of their parent element
      position="relative"
      width={SIZE_MAP[size]}
      zIndex={new FixedZIndex(1)}
    >
      <div className={hovered ? classnames(styles.overlay) : ''}>{children}</div>
    </Box>
  );
}
