// @flow strict

import * as React from 'react';
import PropTypes from 'prop-types';
import layout from './Layout.css';
import { type Indexable, FixedZIndex } from './zIndex.js';

type Threshold =
  | {| top: number | string |}
  | {| bottom: number | string |}
  | {| left: number | string |}
  | {| right: number | string |}
  | {| top: number | string, bottom: number | string |}
  | {| left: number | string, right: number | string |}
  | {|
      top: number | string,
      left: number | string,
      right: number | string,
      bottom: number | string,
    |};

type Props = {|
  children: React.Node,
  zIndex?: Indexable,
  dangerouslySetZIndex?: {| __zIndex: number |},
  ...Threshold,
|};

const DEFAULT_ZINDEX = new FixedZIndex(1);

export default function Sticky(props: Props): React.Node {
  const { dangerouslySetZIndex, children } = props;
  const zIndex =
    props.zIndex ||
    (dangerouslySetZIndex &&
    Object.prototype.hasOwnProperty.call(dangerouslySetZIndex, '__zIndex')
      ? // eslint-disable-next-line no-underscore-dangle
        new FixedZIndex(dangerouslySetZIndex.__zIndex)
      : DEFAULT_ZINDEX);
  const style = {
    top: props.top != null ? props.top : undefined,
    left: props.left != null ? props.left : undefined,
    right: props.right != null ? props.right : undefined,
    bottom: props.bottom != null ? props.bottom : undefined,
    zIndex: zIndex.index(),
  };
  return (
    <div className={layout.sticky} style={style}>
      {children}
    </div>
  );
}

Sticky.propTypes = {
  children: PropTypes.node,
  dangerouslySetZIndex: PropTypes.exact({
    __zIndex: PropTypes.number,
  }),
  top: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  left: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  bottom: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  right: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  // eslint-disable-next-line react/forbid-prop-types
  zIndex: PropTypes.any,
};
