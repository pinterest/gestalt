// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './Mask.css';

type Props = {|
  children?: React.Node,
  height?: number | string,
  shape?: 'circle' | 'rounded' | 'square',
  width?: number | string,
  wash?: boolean,
|};

export default function Mask(props: Props) {
  const { children, shape = 'square', width, height, wash = false } = props;
  return (
    <div className={cx(styles.Mask, styles[shape])} style={{ width, height }}>
      {children}
      {wash && <div className={styles.wash} />}
    </div>
  );
}

Mask.propTypes = {
  children: PropTypes.node,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  shape: PropTypes.oneOf(['circle', 'rounded', 'square']),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  wash: PropTypes.bool,
};
