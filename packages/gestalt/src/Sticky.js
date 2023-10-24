// @flow strict
import { type Node } from 'react';
import layout from './Layout.css';
import { FixedZIndex, type Indexable } from './zIndex.js';

type PositionType = number | string;

type Threshold =
  | { top: PositionType }
  | { bottom: PositionType }
  | { left: PositionType }
  | { right: PositionType }
  | { top: PositionType, bottom: PositionType }
  | { left: PositionType, right: PositionType }
  | {
      top: PositionType,
      left: PositionType,
      right: PositionType,
      bottom: PositionType,
    };

type Props = {
  ...Threshold,
  /**
   * The content to display.
   */
  children: Node,
  /**
   * The height of the sticky container in pixels. This is useful when the sticky container and its content need to have different heights.
   */
  height?: number,
  /**
   * An object representing the z-index of the sticky container. See the [zIndex Classes](https://gestalt.pinterest.systems/web/zindex_classes) page for more information.
   */
  zIndex?: Indexable,
};

const DEFAULT_ZINDEX = new FixedZIndex(1);

/**
 * [Sticky](https://gestalt.pinterest.systems/web/sticky) allows an element to become fixed when it reaches a threshold (top, left, bottom, or right).
 *
 * ![Sticky](https://raw.githubusercontent.com/pinterest/gestalt/master/docs/graphics/building-blocks/Sticky.svg)
 */

export default function Sticky({
  // $FlowExpectedError[prop-missing]
  bottom, // eslint-disable-line react/prop-types
  children,
  height,
  // $FlowExpectedError[prop-missing]
  left, // eslint-disable-line react/prop-types
  // $FlowExpectedError[prop-missing]
  right, // eslint-disable-line react/prop-types
  // $FlowExpectedError[prop-missing]
  top, // eslint-disable-line react/prop-types
  zIndex,
}: Props): Node {
  const style = {
    ...(height !== undefined ? { height } : {}),
    top: top != null ? top : undefined,
    left: left != null ? left : undefined,
    right: right != null ? right : undefined,
    bottom: bottom != null ? bottom : undefined,
    zIndex: (zIndex ?? DEFAULT_ZINDEX).index(),
  };
  return (
    <div className={layout.sticky} style={style}>
      {children}
    </div>
  );
}
