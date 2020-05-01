// @flow strict
import * as React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './Mask.css';
import borders from './Borders.css';
import { fromClassName, identity, toProps, type Style } from './style.js';
import { bind, range } from './transforms.js';

type Rounding = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'circle';

type Props = {|
  children?: React.Node,
  height?: number | string,
  rounding?: Rounding,
  width?: number | string,
  willChangeTransform?: boolean,
  wash?: boolean,
|};

const getRoundingStyle = (r: Rounding): Style => {
  if (typeof r === 'number') {
    return bind(range('rounding'), borders)(r);
  }

  if (r === 'circle') {
    return fromClassName(borders.circle);
  }

  return identity();
};

export default function Mask(props: Props) {
  const {
    children,
    rounding = 0,
    width,
    height,
    willChangeTransform = true,
    wash = false,
  } = props;
  return (
    <div
      className={cx(
        styles.Mask,
        toProps(getRoundingStyle(rounding)).className,
        {
          [styles.willChangeTransform]: willChangeTransform,
        }
      )}
      style={{ width, height }}
    >
      {children}
      {wash && <div className={styles.wash} />}
    </div>
  );
}

const RoundingPropType = PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 'circle']);

Mask.propTypes = {
  children: PropTypes.node,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  rounding: RoundingPropType,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  willChangeTransform: PropTypes.bool,
  wash: PropTypes.bool,
};
