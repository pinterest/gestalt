// @flow strict
import type { Node } from 'react';
import styles from './Divider.css';

export default function Divider(): Node {
  return <hr className={styles.divider} />;
}
