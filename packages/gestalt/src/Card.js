// @flow strict
import type { Node } from 'react';

import { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Box from './Box.js';
import styles from './Card.css';
import { type AbstractEventHandler } from './AbstractEventHandler.js';

type Props = {|
  active?: ?boolean,
  children?: Node,
  image?: Node,
  onMouseEnter?: AbstractEventHandler<SyntheticMouseEvent<HTMLDivElement>>,
  onMouseLeave?: AbstractEventHandler<SyntheticMouseEvent<HTMLDivElement>>,
|};

/**
 * https://gestalt.pinterest.systems/Card
 */
export default function Card(props: Props): Node {
  const [hovered, setHovered] = useState(false);
  const { active, children, image, onMouseEnter, onMouseLeave } = props;

  const handleMouseEnter = (event) => {
    setHovered(true);
    if (onMouseEnter) {
      onMouseEnter({ event });
    }
  };

  const handleMouseLeave = (event) => {
    setHovered(false);
    if (onMouseLeave) {
      onMouseLeave({ event });
    }
  };

  const classes = classnames(styles.card, {
    // JS equality rules == null checks for `null` or `undefined` and leaves out `false`.
    [styles.hover]: active || (active == null && hovered),
  });

  return (
    <Box onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} position="relative">
      {Boolean(image) && <Box marginBottom={1}>{image}</Box>}
      <Box>{children}</Box>
      <div className={classes} />
    </Box>
  );
}

Card.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  image: PropTypes.node,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
};
