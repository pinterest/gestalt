// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '../Box/Box';
import styles from './Pulsar.css';

type Props = {
  paused?: boolean,
  size?: number,
};

export default function Pulsar(props: Props) {
  const { paused, size = 135 } = props;

  return (
    <Box
      dangerouslySetInlineStyle={{
        __style: {
          animationIterationCount: paused ? 0 : 'infinite',
          outline: 'none',
          boxShadow: 'none',
        },
      }}
      display={paused ? 'none' : 'block'}
      height={size}
      position="relative"
      width={size}
    >
      <div className={styles.innerCircle}>
        <div className={styles.outerCircle} />
      </div>
    </Box>
  );
}

Pulsar.propTypes = {
  paused: PropTypes.bool,
  size: PropTypes.number,
};
