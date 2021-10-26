import type { Node } from "react";
import "react";
import cx from "classnames";
import styles from "./Badge.css";
import colors from "./Colors.css";
import { useColorScheme } from "./contexts/ColorScheme";
type Position = "middle" | "top";
type Props = {
  position?: Position;
  text: string;
};
/**
 * https://gestalt.pinterest.systems/Badge
 */

export default function Badge({ position = "middle", text }: Props): Node {
  const { name: colorSchemeName } = useColorScheme();
  const cs = cx(styles.Badge, styles[position], colors.blueBg, {
    [colors.darkGray]: colorSchemeName === "darkMode",
  });
  return <span className={cs}>{text}</span>;
}