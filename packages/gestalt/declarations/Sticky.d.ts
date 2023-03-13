import type { Node } from "react";
import "react";
import type { Indexable } from "./zIndex";
declare type PositionType = number | string;
declare type Threshold = {
    top: PositionType;
} | {
    bottom: PositionType;
} | {
    left: PositionType;
} | {
    right: PositionType;
} | {
    top: PositionType;
    bottom: PositionType;
} | {
    left: PositionType;
    right: PositionType;
} | {
    top: PositionType;
    left: PositionType;
    right: PositionType;
    bottom: PositionType;
};
declare type Props = Threshold & {
    children: Node;
    height?: number;
    zIndex?: Indexable;
};
/**
 * [Sticky](https://gestalt.pinterest.systems/web/sticky) allows an element to become fixed when it reaches a threshold (top, left, bottom, or right).
 *
 * ![Sticky](https://raw.githubusercontent.com/pinterest/gestalt/master/docs/graphics/building-blocks/Sticky.svg)
 */
export default function Sticky(props: Props): Node;
export {};
