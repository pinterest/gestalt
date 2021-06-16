// @flow strict
import type { Node } from 'react';
import cx from 'classnames';
import styles from './Table.css';

type Props = {|
  children: Node,
  sticky?: boolean,
|};

/**
 * https://gestalt.pinterest.systems/Table
 */
export default function TableHeader(props: Props): Node {
  const cs = cx(styles.thead, props.sticky && styles.sticky);
  return <thead className={cs}>{props.children}</thead>;
}
