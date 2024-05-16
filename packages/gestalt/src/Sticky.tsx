import { ReactNode } from 'react';
import layout from './Layout.css';
import { FixedZIndex, Indexable } from './zIndex';

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
  children: ReactNode;
  /**
   * The height of the sticky container in pixels. This is useful when the sticky container and its content need to have different heights.
   */
  height?: number;
  /**
   * An object representing the z-index of the sticky container. See the [zIndex Classes](https://gestalt.pinterest.systems/web/zindex_classes) page for more information.
   */
  zIndex?: Indexable;
};

const DEFAULT_ZINDEX = new FixedZIndex(1);

/**
 * [Sticky](https://gestalt.pinterest.systems/web/sticky) allows an element to become fixed when it reaches a threshold (top, left, bottom, or right).
 *
 * ![Sticky](https://raw.githubusercontent.com/pinterest/gestalt/master/docs/graphics/building-blocks/Sticky.svg)
 */

export default function Sticky({
  // eslint-disable-line react/prop-types
  // @ts-expect-error - TS2339 - Property 'bottom' does not exist on type 'Props'.
  bottom,

  children,
  height,

  // eslint-disable-line react/prop-types
  // @ts-expect-error - TS2339 - Property 'left' does not exist on type 'Props'.
  left,

  // eslint-disable-line react/prop-types
  // @ts-expect-error - TS2339 - Property 'right' does not exist on type 'Props'.
  right,

  // eslint-disable-line react/prop-types
  // @ts-expect-error - TS2339 - Property 'top' does not exist on type 'Props'.
  top,

  zIndex,
}: Props) {
  const style = {
    ...(height !== undefined ? { height } : {}),
    top: top != null ? top : undefined,
    left: left != null ? left : undefined,
    right: right != null ? right : undefined,
    bottom: bottom != null ? bottom : undefined,
    zIndex: (zIndex ?? DEFAULT_ZINDEX).index(),
  } as const;
  return (
    <div className={layout.sticky} style={style}>
      {children}
    </div>
  );
}

Sticky.displayName = 'Sticky';
