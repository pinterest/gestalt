// @flow strict
import * as React from 'react';
import cx from 'classnames';
import styles from './Badge.css';
import colors from './Colors.css';

type Props = {|
  position?: 'middle' | 'top',
  text: string,
|};

export default function Badge(props: Props): React.Node {
  const { position = 'middle', text } = props;

  const cs = cx(styles.Badge, styles[position], colors.blueBg);

  return <span className={cs}>{text}</span>;
}
