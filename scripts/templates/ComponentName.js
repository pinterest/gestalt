// @flow strict
import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import Box from './Box.js';
import styles from './ComponentName.css';

type Props = {|
  accessibilityLabel?: string,
|};

export default function ComponentName({ accessibilityLabel }: Props): Node {
  return (
    <Box aria-label={accessibilityLabel}>
      <div className={styles.customClass} />
    </Box>
  );
}

ComponentName.propTypes = {
  accessibilityLabel: PropTypes.string,
};
