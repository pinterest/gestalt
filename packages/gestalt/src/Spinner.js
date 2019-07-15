// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Box from './Box.js';
import Icon from './Icon.js';
import styles from './Spinner.css';

const SIZE = 40;

type Props = {|
  accessibilityLabel: string,
  delay?: boolean,
  show: boolean,
|};

export default function Spinner({
  accessibilityLabel,
  delay = true,
  show,
}: Props) {
  return show ? (
    <Box display="flex" justifyContent="around" overflow="hidden">
      <div className={classnames(styles.icon, { [styles.delay]: delay })}>
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
  delay: PropTypes.bool,
};
