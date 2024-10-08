import { useEffect } from 'react';
import {
  arrow,
  autoUpdate,
  flip,
  hide,
  limitShift,
  offset,
  Placement,
  shift,
  Side,
  Strategy,
  useFloating,
  UseFloatingReturn,
} from '@floating-ui/react';

type MainDirections = 'up' | 'right' | 'down' | 'left';

export const SIDES_MAP: Record<Side, MainDirections> = {
  'bottom': 'down',
  'left': 'left',
  'right': 'right',
  'top': 'up',
};

const POPOVER_OFFSET_VALUE = 8; // pixels

interface Props {
  /**
   * Reference element
   */
  anchor?: HTMLElement | null;
  /**
   * Caret (Popover arrow) element
   */
  caretElement?: HTMLElement | null;
  /**
   * Padding between caret and the *edges* of Popover. This will prevent caret from overflowing the corners
   */
  caretPadding?: number;
  /**
   * Container element in which Popover flips directions or shifts itself upon reaching its viewport boundaries.
   * Default is window viewport.
   */
  scrollBoundary?: HTMLElement | null;
  /**
   * Specifies the preferred position of Popover relative to its anchor element.
   */
  direction?: Placement;
  /**
   * Forces the position of Popover relative to its anchor element.
   */
  forceDirection?: boolean;
  /**
   * Type of CSS position property to use.
   * Deafult is `absolute`
   */
  strategy?: Strategy;
  /**
   * Whether to hide Popover when reference element gets out of viewport.
   */
  hideWhenReferenceHidden?: boolean;
  /**
   * Callback fired when Popover is correctly positioned after it's mounted.
   */
  onPositioned?: () => void;
}

export default function usePopover({
  anchor,
  caretElement,
  caretPadding,
  direction,
  forceDirection,
  strategy,
  scrollBoundary,
  hideWhenReferenceHidden,
  onPositioned,
}: Props): UseFloatingReturn {
  let placement: Placement = direction ?? 'bottom';
  const isRtl = typeof document === 'undefined' ? false : document?.dir === 'rtl';

  if (isRtl && direction === 'left') {
    placement = 'right';
  } else if (isRtl && direction === 'right') {
    placement = 'left';
  }

  // #region Middlewares

  // Distance between anchor and popover
  const popoverOffset = offset(POPOVER_OFFSET_VALUE);
  // Hides popover when anchor is outside of viewport. Padding is negative so that it compensates for `popoverOffset`
  const popoverHide = hideWhenReferenceHidden && hide({ padding: -POPOVER_OFFSET_VALUE });
  // Calculates the positon of caret
  const popoverArrow = caretElement && arrow({ element: caretElement, padding: caretPadding });
  // Flips popover direction based on available space
  const popoverFlip = flip({
    // @ts-expect-error - TS2322 - Type 'HTMLElement | null | undefined' is not assignable to type 'Boundary | undefined'.
    boundary: scrollBoundary,
    fallbackAxisSideDirection: 'start',
  });
  // Shifts popover to prevent clipping near viewport edges
  const popoverShift = shift({
    padding: 8,
    // @ts-expect-error - TS2322 - Type 'HTMLElement | null | undefined' is not assignable to type 'Boundary | undefined'.
    boundary: scrollBoundary,
    limiter: limitShift({
      offset: 5,
    }),
  });

  // #endregion

  const floating = useFloating({
    strategy,
    placement,
    whileElementsMounted: autoUpdate,
    elements: { reference: anchor },
    // Do not reorder middlewares! Order is important as the calculations are passed along
    middleware: [
      popoverOffset,
      popoverShift,
      forceDirection ? undefined : popoverFlip,
      popoverArrow,
      popoverHide,
    ],
  });

  useEffect(() => {
    if (floating.isPositioned && onPositioned) onPositioned();
  }, [onPositioned, floating.isPositioned]);

  return floating;
}
