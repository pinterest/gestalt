// @flow
import * as React from 'react';
import Box from '../Box/Box';
import PropTypes from 'prop-types';
import styles from './Pulsar.css';

type Props = {
  paused?: boolean,
  size?: number,
};

export default function Pulsar(props: Props) {
  const { paused, size = 96 } = props;

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
      <div className={styles.innerCircle} />
      <div className={styles.outerCircle} />
    </Box>
  );
}

Pulsar.propTypes = {
  paused: PropTypes.bool,
  size: PropTypes.number,
};
