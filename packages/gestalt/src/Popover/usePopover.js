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
import { type MainDirections } from '../utils/positioningTypes.js';

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
  anchor?: HTMLElement | null;
  caretElement?: HTMLElement | null;
  scrollBoundary?: HTMLElement | null; // define boundaries for popover should flip or shift itself
  direction?: Placement | 'forceDown';
  strategy?: Strategy;
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
    boundary: scrollBoundary, // default is window
    fallbackAxisSideDirection: 'start',
  });
  // Shifts popover to prevent clipping near viewport edges
  const popoverShift = shift({
    padding: 8,
    crossAxis: false,
    boundary: scrollBoundary, // default is window
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
    // Order of middlewares are important as the calculations are passed along
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
