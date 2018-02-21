// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '../Box/Box';
import Icon from '../Icon/Icon';
import styles from './Spinner.css';

const SIZE = 40;

type Props = {|
  accessibilityLabel: string,
  show: boolean,
|};

export default function Spinner({ accessibilityLabel, show }: Props) {
  return show ? (
    <Box xs={{ display: 'flex' }} justifyContent="around" overflow="hidden">
      <div className={styles.icon}>
        <Icon
          icon="knoop"
          accessibilityLabel={accessibilityLabel}
          size={SIZE}
        />
      </div>
    </Box>
  ) : (
    <div />
  );
}

Spinner.propTypes = {
  show: PropTypes.bool.isRequired,
  accessibilityLabel: PropTypes.string.isRequired,
};
