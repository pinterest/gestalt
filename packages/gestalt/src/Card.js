// @flow strict
import { type Node, useState } from 'react';
import classnames from 'classnames';
import Box from './Box.js';
import styles from './Card.css';

function isNil(val) {
  return val === undefined || val === null;
}

type Props = {|
  /**
   * Used to force the "active" hover state visually.
   */
  active?: ?boolean,
  /**
   *
   */
  children?: Node,
  /**
   * An optional [Image](https://gestalt.pinterest.systems/image) to be displayed at the top of the layout.
   */
  image?: Node,
  /**
   * Optional callback fired when the user mouses over Card.
   */
  onMouseEnter?: ({| event: SyntheticMouseEvent<HTMLDivElement> |}) => void,
  /**
   * Optional callback fired when the user away from Card.
   */
  onMouseLeave?: ({| event: SyntheticMouseEvent<HTMLDivElement> |}) => void,
|};

/**
 * [Card](https://gestalt.pinterest.systems/card) is used to highlight content in grids. It visually shows that children elements belong together and can highlight the items on hover.
 */
export default function Card({ active, children, image, onMouseEnter, onMouseLeave }: Props): Node {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = (event) => {
    setHovered(true);
    onMouseEnter?.({ event });
  };

  const handleMouseLeave = (event) => {
    setHovered(false);
    onMouseLeave?.({ event });
  };

  const classes = classnames(styles.card, {
    [styles.hover]: isNil(active) ? hovered : active,
  });

  return (
    <Box onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} position="relative">
      {Boolean(image) && <Box marginBottom={1}>{image}</Box>}
      <Box>{children}</Box>
      <div className={classes} />
    </Box>
  );
}
