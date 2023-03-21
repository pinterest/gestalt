import type { Node, AbstractComponent } from 'react';
type AriaCurrent = 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false' | 'section';
type Rounding = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'circle' | 'pill';
type FocusEventHandler = (arg0: {
  event: React.FocusEvent<HTMLDivElement> | React.FocusEvent<HTMLAnchorElement>;
}) => void;
type MouseEventHandler = (arg0: {
  event: React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLAnchorElement>;
}) => void;
type KeyboardEventHandler = (arg0: {
  event: React.KeyboardEvent<HTMLDivElement> | React.KeyboardEvent<HTMLAnchorElement>;
}) => void;
export type OnTapType = (arg0: {
  event:
    | React.MouseEvent<HTMLDivElement>
    | React.KeyboardEvent<HTMLDivElement>
    | React.MouseEvent<HTMLAnchorElement>
    | React.KeyboardEvent<HTMLAnchorElement>;
  dangerouslyDisableOnNavigation: () => void;
}) => void;
type BaseTapArea = {
  accessibilityLabel?: string;
  children?: Node;
  disabled?: boolean;
  fullHeight?: boolean;
  fullWidth?: boolean;
  mouseCursor?: 'copy' | 'grab' | 'grabbing' | 'move' | 'noDrop' | 'pointer' | 'zoomIn' | 'zoomOut';
  onBlur?: FocusEventHandler;
  onFocus?: FocusEventHandler;
  onKeyDown?: KeyboardEventHandler;
  onMouseDown?: MouseEventHandler;
  onMouseUp?: MouseEventHandler;
  onMouseEnter?: MouseEventHandler;
  onMouseLeave?: MouseEventHandler;
  onTap?: OnTapType;
  role?: 'button' | 'link' | 'switch';
  rounding?: Rounding;
  tabIndex?: -1 | 0;
  tapStyle?: 'none' | 'compress';
};
type TapAreaType = BaseTapArea & {
  accessibilityChecked?: boolean;
  accessibilityControls?: string;
  accessibilityExpanded?: boolean;
  accessibilityHaspopup?: boolean;
  role?: 'button' | 'switch';
};
type LinkTapAreaType = BaseTapArea & {
  accessibilityCurrent?: AriaCurrent;
  href: string;
  rel?: 'none' | 'nofollow';
  role: 'link';
  target?: null | 'self' | 'blank';
};
type unionProps = TapAreaType | LinkTapAreaType;
type unionRefs = HTMLDivElement | HTMLAnchorElement;
/**
 * [TapArea](https://gestalt.pinterest.systems/tapArea) allows components to be clickable and touchable in an accessible way
 *
 * ![TapArea](https://raw.githubusercontent.com/pinterest/gestalt/master/docs/graphics/building-blocks/TapArea.svg)
 *
 */
declare const TapAreaWithForwardRef: AbstractComponent<unionProps, unionRefs>;
export default TapAreaWithForwardRef;
