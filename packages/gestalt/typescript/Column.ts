import type { Node } from "react";
import classnames from "classnames";
import styles from "./Column.css";
type Columns = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type ColumnProps = {
  children?: Node;
  span: Columns;
  smSpan?: Columns;
  mdSpan?: Columns;
  lgSpan?: Columns;
};
/**
 * https://gestalt.pinterest.systems/Column
 */

export default function Column(props: ColumnProps): Node {
  const { children } = props;
  const cs = classnames(
    props.span != null && styles[`xsCol${props.span}`],
    props.smSpan != null && styles[`smCol${props.smSpan}`],
    props.mdSpan != null && styles[`mdCol${props.mdSpan}`],
    props.lgSpan != null && styles[`lgCol${props.lgSpan}`]
  );
  return <div className={cs}>{children}</div>;
}