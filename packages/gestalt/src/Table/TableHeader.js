// @flow strict
import * as React from 'react';
import cx from 'classnames';
import styles from './Table.css';

type Props = {|
  children: React.Node,
  sticky?: boolean,
|};

export default function TableHeader(props: Props) {
  const cs = cx(styles.thead, props.sticky && styles.sticky);
  return <thead className={cs}>{props.children}</thead>;
}
