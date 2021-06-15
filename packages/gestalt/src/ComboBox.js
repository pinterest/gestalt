// @flow strict
import type { Node } from 'react';
import PropTypes from 'prop-types';
import Box from './Box.js';
import styles from './ComboBox.css';

type Props = {|
  accessibilityLabel?: string,
|};

export default function ComboBox({ accessibilityLabel }: Props): Node {
  return (
    <Box aria-label={accessibilityLabel}>
      <div className={styles.customClass} />
    </Box>
  );
}

ComboBox.propTypes = {
  accessibilityLabel: PropTypes.string,
};
