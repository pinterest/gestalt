import type { Node, AbstractComponent } from "react";
import type { Rounding } from "./getRoundingClassName";
import type { AbstractEventHandler } from "./AbstractEventHandler";
import "./AbstractEventHandler";
import type { AriaCurrent } from "./ariaTypes";
import "./ariaTypes";
declare type FocusEventHandler = AbstractEventHandler<React.FocusEvent<HTMLDivElement> | React.FocusEvent<HTMLAnchorElement>>;
declare type MouseEventHandler = AbstractEventHandler<React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLAnchorElement>>;
declare type KeyboardEventHandler = AbstractEventHandler<React.KeyboardEvent<HTMLDivElement> | React.KeyboardEvent<HTMLAnchorElement>>;
export declare type OnTapType = AbstractEventHandler<React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>, {
    dangerouslyDisableOnNavigation: () => void;
}>;
declare type BaseTapArea = {
    accessibilityLabel?: string;
    children?: Node;
    disabled?: boolean;
    fullHeight?: boolean;
    fullWidth?: boolean;
    mouseCursor?: "copy" | "grab" | "grabbing" | "move" | "noDrop" | "pointer" | "zoomIn" | "zoomOut";
    onBlur?: FocusEventHandler;
    onFocus?: FocusEventHandler;
    onKeyDown?: KeyboardEventHandler;
    onMouseDown?: MouseEventHandler;
    onMouseUp?: MouseEventHandler;
    onMouseEnter?: MouseEventHandler;
    onMouseLeave?: MouseEventHandler;
    onTap?: OnTapType;
    role?: "button" | "link" | "switch";
    rounding?: Rounding;
    tabIndex?: -1 | 0;
    tapStyle?: "none" | "compress";
};
declare type TapAreaType = BaseTapArea & {
    accessibilityChecked?: boolean;
    accessibilityControls?: string;
    accessibilityExpanded?: boolean;
    accessibilityHaspopup?: boolean;
    role?: "button" | "switch";
};
declare type LinkTapAreaType = BaseTapArea & {
    accessibilityCurrent?: AriaCurrent;
    href: string;
    rel?: "none" | "nofollow";
    role: "link";
    target?: null | "self" | "blank";
};
declare type unionProps = TapAreaType | LinkTapAreaType;
declare type unionRefs = HTMLDivElement | HTMLAnchorElement;
/**
 * [TapArea](https://gestalt.pinterest.systems/tapArea) allows components to be clickable and touchable in an accessible way
 *
 * ![TapArea](https://raw.githubusercontent.com/pinterest/gestalt/master/docs/graphics/building-blocks/TapArea.svg)
 *
 */
declare const TapAreaWithForwardRef: AbstractComponent<unionProps, unionRefs>;
export default TapAreaWithForwardRef;
