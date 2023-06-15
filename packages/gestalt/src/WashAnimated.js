// @flow strict
import { type Node, useState } from 'react';
import classnames from 'classnames';
import Box from './Box.js';
import styles from './WashAnimated.css';

function isNil(val: ?boolean) {
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
   * An optional [Image](https://gestalt.pinterest.systems/web/image) to be displayed at the top of the layout.
   */
  image?: Node,
  /**
   * Optional callback fired when the user hovers over from WashAnimated.
   */
  onMouseEnter?: ({| event: SyntheticMouseEvent<HTMLDivElement> |}) => void,
  /**
   * Optional callback fired when the user hovers off WashAnimated.
   */
  onMouseLeave?: ({| event: SyntheticMouseEvent<HTMLDivElement> |}) => void,
|};

/**
 * [WashAnimated](https://gestalt.pinterest.systems/web/washanimated) is used to highlight content in grids. It visually shows that children elements belong together and can highlight the items on hover.
 * ![WashAnimated light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/WashAnimated.spec.mjs-snapshots/WashAnimated-chromium-darwin.png)
 * ![WashAnimated dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/WashAnimated-dark.spec.mjs-snapshots/Button-dark-chromium-darwin.png)
 */
export default function WashAnimated({
  active,
  children,
  image,
  onMouseEnter,
  onMouseLeave,
}: Props): Node {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = (event: SyntheticMouseEvent<HTMLDivElement>) => {
    setHovered(true);
    onMouseEnter?.({ event });
  };

  const handleMouseLeave = (event: SyntheticMouseEvent<HTMLDivElement>) => {
    setHovered(false);
    onMouseLeave?.({ event });
  };

  const classes = classnames(styles.washanimated, {
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
