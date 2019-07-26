// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Box from './Box.js';
import Icon from './Icon.js';
import styles from './Spinner.css';

const SIZE_NAME_TO_PIXEL = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 56,
};

type Props = {|
  accessibilityLabel: string,
  delay?: boolean,
  show: boolean,
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
|};

export default function Spinner({
  accessibilityLabel,
  delay = true,
  show,
  size = 'md',
}: Props) {
  const iconSize = SIZE_NAME_TO_PIXEL[size];
  return show ? (
    <Box display="flex" justifyContent="around" overflow="hidden">
      <div className={classnames(styles.icon, { [styles.delay]: delay })}>
        <Icon
          icon="knoop"
          accessibilityLabel={accessibilityLabel}
          size={iconSize}
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
  delay: PropTypes.bool,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
};
