import type { Node } from "react";
import styles from "./Divider.css";
/**
 * https://gestalt.pinterest.systems/Divider
 */

export default function Divider(): Node {
  return <hr className={styles.divider} />;
}