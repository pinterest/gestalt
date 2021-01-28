// @flow strict
import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './Mask.css';
import getRoundingClassName from './getRoundingClassName.js';

type Rounding = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'circle';

type Props = {|
  children?: Node,
  height?: number | string,
  rounding?: Rounding,
  width?: number | string,
  willChangeTransform?: boolean,
  wash?: boolean,
|};

export default function Mask(props: Props): Node {
  const { children, rounding = 0, width, height, willChangeTransform = true, wash = false } = props;
  return (
    <div
      className={cx(styles.Mask, getRoundingClassName(rounding), {
        [styles.willChangeTransform]: willChangeTransform,
      })}
      style={{ width, height }}
    >
      {children}
      {wash && <div className={styles.wash} />}
    </div>
  );
}

// $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
const RoundingPropType = PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 'circle']);

Mask.propTypes = {
  children: PropTypes.node,
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  rounding: RoundingPropType,
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  willChangeTransform: PropTypes.bool,
  wash: PropTypes.bool,
};
