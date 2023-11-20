// @flow strict
import {
  arrow,
  autoUpdate,
  flip,
  hide,
  limitShift,
  offset,
  type Placement,
  shift,
  type Side,
  type Strategy,
  useFloating,
  type UseFloatingReturn,
} from '@floating-ui/react';
import { type MainDirections } from '../utils/positioningTypes';

export const DIRECTIONS_MAP: Record<MainDirections, Side | 'forceDown'> = {
  down: 'bottom',
  forceDown: 'forceDown',
  left: 'left',
  right: 'right',
  up: 'top',
};

export const SIDES_MAP: Record<Side, MainDirections> = {
  'bottom': 'down',
  'left': 'left',
  'right': 'right',
  'top': 'up',
};

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
   * Container element in which Popover flips directions or shifts itself upon reaching its viewport boundaries.
   * Default is window viewport.
   */
  scrollBoundary?: HTMLElement | null;
  /**
   * Specifies the preferred position of Popover relative to its anchor element.
   */
  direction?: Placement | 'forceDown';
  /**
   * Type of CSS position property to use.
   * Deafult is `absolute`
   */
  strategy?: Strategy;
  /**
   * Whether to hide Popover when reference element gets out of viewport.
   */
  hideWhenReferenceHidden?: boolean;
}

export default function usePopover({
  anchor,
  caretElement,
  direction,
  strategy,
  scrollBoundary,
  hideWhenReferenceHidden,
}: Props): UseFloatingReturn {
  const isForceDown = direction === 'forceDown';
  const placement = isForceDown ? 'bottom' : direction;

  // #region Middlewares

  // Distance between anchor and popover
  const popoverOffset = offset(8);
  // Hides popover when anchor is outside of viewport
  const popoverHide = hideWhenReferenceHidden && hide();
  // Calculates the positon of caret
  const popoverArrow = caretElement && arrow({ element: caretElement });
  // Flips popover direction based on available space
  const popoverFlip = flip({
    boundary: scrollBoundary,
    fallbackAxisSideDirection: 'start',
  });
  // Shifts popover to prevent clipping near viewport edges
  const popoverShift = shift({
    padding: 8,
    crossAxis: false,
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
      isForceDown ? undefined : popoverFlip,
      popoverShift,
      popoverArrow,
      hideWhenReferenceHidden && popoverHide,
    ],
  });

  return floating;
}
