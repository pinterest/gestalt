// @flow strict
import * as React from 'react';
import PropTypes from 'prop-types';
import styles from './Badge.css';

type Props = {|
  text: string,
|};

export default function Badge(props: Props) {
  const { text } = props;
  return <span className={styles.Badge}>{text}</span>;
}

Badge.propTypes = {
  text: PropTypes.string.isRequired,
};
