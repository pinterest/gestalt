// @flow strict
import type { Node } from 'react';
import PropTypes from 'prop-types';
import layout from './Layout.css';
import { FixedZIndex, type Indexable, UnsafeIndexablePropType } from './zIndex.js';

type PositionType = number | string;

type Threshold =
  | {| top: PositionType |}
  | {| bottom: PositionType |}
  | {| left: PositionType |}
  | {| right: PositionType |}
  | {| top: PositionType, bottom: PositionType |}
  | {| left: PositionType, right: PositionType |}
  | {|
      top: PositionType,
      left: PositionType,
      right: PositionType,
      bottom: PositionType,
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

const PositionPropType: React$PropType$Primitive<PositionType> = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.string,
]);

Sticky.propTypes = {
  children: PropTypes.node,
  top: PositionPropType,
  left: PositionPropType,
  bottom: PositionPropType,
  right: PositionPropType,
  height: PropTypes.number,
  zIndex: UnsafeIndexablePropType,
};
