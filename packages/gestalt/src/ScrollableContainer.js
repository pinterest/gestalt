// @flow strict
import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import Box from './Box.js';
import styles from './ScrollableContainer.css';

type Props = {|
  accessibilityLabel?: string,
|};

export default function ScrollableContainer({ accessibilityLabel }: Props): Node {
  return (
    <Box aria-label={accessibilityLabel}>
      <div className={styles.customClass} />
    </Box>
  );
}

ScrollableContainer.propTypes = {
  accessibilityLabel: PropTypes.string,
};
