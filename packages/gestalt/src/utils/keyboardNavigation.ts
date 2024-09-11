export const KEYS = {
  UP: -1,
  DOWN: 1,
  ENTER: 0,
} as const;

export type DirectionOptionType = -1 | 0 | 1;
type Props = {
  direction: DirectionOptionType;
  containerRef?: {
    current: null | HTMLElement;
  };
  currentHoveredOption: HTMLElement | null | undefined;
};

const handleContainerScrolling = ({ direction, containerRef, currentHoveredOption }: Props) => {
  const container = containerRef?.current;

  // Based on keyboard navigation we get the next or previous option
  // When we reach the start or end of the list, move to the start or end of the list based on the direction
  const nextOption =
    direction === KEYS.DOWN
      ? currentHoveredOption?.nextSibling
      : currentHoveredOption?.previousSibling;

  // Handles which option to display once we've hit the end of the list range
  const endRangeOption = direction === KEYS.DOWN ? container?.firstChild : container?.lastChild;

  const nextSelectedOption = nextOption ?? endRangeOption;

  // If one of these nodes is missing, exit early
  if (!container || !nextSelectedOption) return;

  const containerHeight = container.getClientRects()[0]?.height ?? 0;
  const overScroll =
    nextSelectedOption instanceof HTMLElement && nextSelectedOption?.offsetHeight
      ? nextSelectedOption.offsetHeight / 3
      : 0;

  const scrollPos =
    nextSelectedOption instanceof HTMLElement
      ? nextSelectedOption.offsetTop +
        nextSelectedOption.clientHeight -
        containerHeight +
        overScroll
      : 0;

  container.scrollTop = scrollPos;
};

export default handleContainerScrolling;
