import type { Node } from "react";
import layout from "./Layout.css";
import type { Indexable } from "./zIndex";
import { FixedZIndex } from "./zIndex";
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
  children: Node;
  height?: number;
  zIndex?: Indexable;
};
const DEFAULT_ZINDEX = new FixedZIndex(1);
export default function Sticky(props: Props): Node {
  const { children, height } = props;
  const zIndex = props.zIndex || DEFAULT_ZINDEX;
  const style = {
    ...(height !== undefined
      ? {
          height,
        }
      : {}),
    // eslint-disable-next-line react/prop-types
    top: props.top != null ? props.top : undefined,
    // eslint-disable-next-line react/prop-types
    left: props.left != null ? props.left : undefined,
    // eslint-disable-next-line react/prop-types
    right: props.right != null ? props.right : undefined,
    // eslint-disable-next-line react/prop-types
    bottom: props.bottom != null ? props.bottom : undefined,
    zIndex: zIndex.index(),
  };
  return (
    <div className={layout.sticky} style={style}>
      {children}
    </div>
  );
}