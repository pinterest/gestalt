import type { Node } from 'react';
import 'react';
interface Indexable {
  index(): number;
}
type PositionType = number | string;
type Threshold =
  | {
      top: PositionType;
    }
  | {
      bottom: PositionType;
    }
  | {
      left: PositionType;
    }
  | {
      right: PositionType;
    }
  | {
      top: PositionType;
      bottom: PositionType;
    }
  | {
      left: PositionType;
      right: PositionType;
    }
  | {
      top: PositionType;
      left: PositionType;
      right: PositionType;
      bottom: PositionType;
    };
type Props = Threshold & {
  /**
   * The content to display.
   */
  children: Node;
  /**
   * The height of the sticky container in pixels. This is useful when the sticky container and its content need to have different heights.
   */
  height?: number;
  /**
   * An object representing the z-index of the sticky container. See the [zIndex Classes](https://gestalt.pinterest.systems/web/zindex_classes) page for more information.
   */
  zIndex?: Indexable;
};
/**
 * [Sticky](https://gestalt.pinterest.systems/web/sticky) allows an element to become fixed when it reaches a threshold (top, left, bottom, or right).
 *
 * ![Sticky](https://raw.githubusercontent.com/pinterest/gestalt/master/docs/graphics/building-blocks/Sticky.svg)
 */
export default function Sticky({ bottom, children, height, left, right, top, zIndex }: Props): Node;
export {};
