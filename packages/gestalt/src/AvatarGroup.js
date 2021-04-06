// @flow strict
import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import Box from './Box.js';
import styles from './AvatarGroup.css';

type Props = {|
  accessibilityLabel?: string,
|};

export default function AvatarGroup({ accessibilityLabel }: Props): Node {
  return (
    <Box aria-label={accessibilityLabel}>
      <div className={styles.customClass} />
    </Box>
  );
}

AvatarGroup.propTypes = {
  accessibilityLabel: PropTypes.string,
};
