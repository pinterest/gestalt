// @flow strict
export type DirectionOptionType = -1 | 0 | 1;

const handleContainerScrolling = (
  direction: DirectionOptionType,
  containerRef: {| current: ?HTMLElement |},
  selectedElement: ?HTMLElement,
) => {
  const container = containerRef.current;

  // Based on keyboard navigation we get the next or previous option
  // When we reach the start or end of the list, move to the start or end of the list based on the direction
  const nextOption =
    direction > 0 ? selectedElement?.nextSibling : selectedElement?.previousSibling;

  // Handles which option to display once we've hit the end of the list range
  const endRangeOption =
    direction > 0 ? container?.firstChild?.firstChild : container?.firstChild?.lastChild;

  const selectedOption = nextOption || endRangeOption;

  // If one of these nodes is missing, exit early
  if (!container || !selectedOption) return;

  const containerHeight = container.getClientRects()[0].height;
  const overScroll = selectedOption instanceof HTMLElement && selectedOption?.offsetHeight / 3;

  const scrollPos =
    selectedOption instanceof HTMLElement &&
    selectedOption.offsetTop + selectedOption.clientHeight - containerHeight + overScroll;
  // $FlowFixMe[incompatible-type] flow 0.135.0 upgrade
  container.scrollTop = scrollPos;
};

export default handleContainerScrolling;
