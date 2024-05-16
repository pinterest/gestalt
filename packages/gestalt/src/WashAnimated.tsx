import { ReactNode, useState } from 'react';
import classnames from 'classnames';
import Box from './Box';
import styles from './WashAnimated.css';

function isNil(val?: boolean | null) {
  return val === undefined || val === null;
}

type Props = {
  /**
   * Used to force the "active" hover state visually.
   */
  active?: boolean | null | undefined;
  /**
   *
   */
  children?: ReactNode;
  /**
   * An optional [Image](https://gestalt.pinterest.systems/web/image) to be displayed at the top of the layout.
   */
  image?: ReactNode;
  /**
   * Optional callback fired when the user hovers over from WashAnimated.
   */
  onMouseEnter?: (arg1: { event: React.MouseEvent<HTMLDivElement> }) => void;
  /**
   * Optional callback fired when the user hovers off WashAnimated.
   */
  onMouseLeave?: (arg1: { event: React.MouseEvent<HTMLDivElement> }) => void;
};

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
}: Props) {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    setHovered(true);
    onMouseEnter?.({ event });
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    setHovered(false);
    onMouseLeave?.({ event });
  };

  const classes = classnames(styles.washanimated, {
    [styles.hover]: isNil(active) ? hovered : active,
  });

  return (
    // @ts-expect-error - TS2322 - Type '{ children: (false | Element)[]; onMouseEnter: (event: MouseEvent<HTMLDivElement, MouseEvent>) => void; onMouseLeave: (event: MouseEvent<HTMLDivElement, MouseEvent>) => void; position: "relative"; }' is not assignable to type 'IntrinsicAttributes & Omit<Props, "ref"> & RefAttributes<HTMLElement>'.
    <Box onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} position="relative">
      {Boolean(image) && <Box marginBottom={1}>{image}</Box>}
      <Box>{children}</Box>
      <div className={classes} />
    </Box>
  );
}

WashAnimated.displayName = 'WashAnimated';
