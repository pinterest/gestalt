// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './Badge.css';

type Props = {|
  size?: 'sm' | 'md' | 'lg',
  text: string,
|};

export default function Badge(props: Props) {
  const { size = 'sm', text } = props;
  const cs = cx(styles.Badge, styles[size]);

  return <span className={cs}>{text}</span>;
}

Badge.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  text: PropTypes.string.isRequired,
};
