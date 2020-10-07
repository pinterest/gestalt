// @flow strict
import React, { type Node } from 'react';
import styles from './Table.css';

type Props = {|
  children: Node,
|};

export default function TableBody(props: Props): Node {
  return <tbody className={styles.tbody}>{props.children}</tbody>;
}
