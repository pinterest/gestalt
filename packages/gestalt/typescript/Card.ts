import type { Node } from "react";
import { useState } from "react";
import classnames from "classnames";
import Box from "./Box";
import styles from "./Card.css";
import type { AbstractEventHandler } from "./AbstractEventHandler";
import "./AbstractEventHandler";
type Props = {
  active?: boolean | null | undefined;
  children?: Node;
  image?: Node;
  onMouseEnter?: AbstractEventHandler<React.MouseEvent<HTMLDivElement>>;
  onMouseLeave?: AbstractEventHandler<React.MouseEvent<HTMLDivElement>>;
};
/**
 * https://gestalt.pinterest.systems/Card
 */

export default function Card(props: Props): Node {
  const [hovered, setHovered] = useState(false);
  const { active, children, image, onMouseEnter, onMouseLeave } = props;

  const handleMouseEnter = (event) => {
    setHovered(true);

    if (onMouseEnter) {
      onMouseEnter({
        event,
      });
    }
  };

  const handleMouseLeave = (event) => {
    setHovered(false);

    if (onMouseLeave) {
      onMouseLeave({
        event,
      });
    }
  };

  const classes = classnames(styles.card, {
    // JS equality rules == null checks for `null` or `undefined` and leaves out `false`.
    [styles.hover]: active || (active == null && hovered),
  });
  return (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      position="relative"
    >
      {Boolean(image) && <Box marginBottom={1}>{image}</Box>}
      <Box>{children}</Box>
      <div className={classes} />
    </Box>
  );
}