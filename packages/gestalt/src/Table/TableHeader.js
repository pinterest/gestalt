// @flow strict
import * as React from 'react';
import styles from './Table.css';

type Props = {|
  children: React.Node,
|};

export default function TableHeader(props: Props) {
  return <thead className={styles.thead}>{props.children}</thead>;
}
