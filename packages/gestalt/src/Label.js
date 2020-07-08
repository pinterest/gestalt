// @flow strict
import * as React from 'react';
import styles from './Label.css';

type Props = {|
  children?: React.Node,
  htmlFor: string,
|};

export default function Label(props: Props): React.Node {
  const { children, htmlFor } = props;

  return (
    <label className={styles.label} htmlFor={htmlFor}>
      {children}
    </label>
  );
}
