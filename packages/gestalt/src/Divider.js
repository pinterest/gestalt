// @flow strict
import * as React from 'react';
import styles from './Divider.css';

export default function Divider(): React.Node {
  return <hr className={styles.divider} />;
}
