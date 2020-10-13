// @flow strict

import React, { type Node } from 'react';
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
  ...Threshold,
  children: Node,
  height?: number,
  zIndex?: Indexable,
|};

const DEFAULT_ZINDEX = new FixedZIndex(1);

export default function Sticky(props: Props): Node {
  const { children, height } = props;
  const zIndex = props.zIndex || DEFAULT_ZINDEX;
  const style = {
    ...(height !== undefined ? { height } : {}),
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
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  top: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  left: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  bottom: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  right: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.number,
  // eslint-disable-next-line react/forbid-prop-types
  zIndex: PropTypes.any,
};
