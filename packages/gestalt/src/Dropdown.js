// @flow strict
import React, { Children, cloneElement, useState, useRef, type Node } from 'react';
import PropTypes from 'prop-types';
import Box from './Box.js';
import Flyout from './Flyout.js';
import Layer from './Layer.js';
import DropdownItem from './DropdownItem.js';
import DropdownSection from './DropdownSection.js';
import DropdownContext from './DropdownContextProvider.js';
import { type Indexable, UnsafeIndexablePropType } from './zIndex.js';
import handleContainerScrolling, { type DirectionOptionType } from './utils/keyboardNavigation.js';
import { type AbstractEventHandler } from './AbstractEventHandler.js';
import { ESCAPE, SPACE, TAB, ENTER, UP_ARROW, DOWN_ARROW } from './keyCodes.js';
import { type OptionObject } from './MenuOption.js';

type Props = {|
  anchor?: ?HTMLElement,
  children: Node,
  headerContent?: Node,
  id: string,
  idealDirection?: 'up' | 'right' | 'down' | 'left',
  onDismiss: () => void,
  onSelect?: AbstractEventHandler<
    SyntheticKeyboardEvent<HTMLElement> | SyntheticMouseEvent<HTMLElement>,
    {| item: OptionObject |},
  >,
  zIndex?: Indexable,
|};

const KEYS = {
  UP: -1,
  DOWN: 1,
  ENTER: 0,
};
export default function Dropdown({
  anchor,
  children,
  headerContent,
  id,
  idealDirection = 'down',
  onDismiss,
  onSelect,
  zIndex,
}: Props): Node {
  const flattenedChildren = Children.toArray(children).reduce(
    (accumulatedChildren, currentChild) => {
      const {
        props: { children: currentItemChildren },
        type: { displayName },
      } = currentChild;
      if (currentItemChildren && displayName === 'DropdownSection') {
        return [...accumulatedChildren, ...currentItemChildren];
      }
      if (displayName === 'DropdownItem') {
        return [...accumulatedChildren, currentChild];
      }
      // eslint-disable-next-line no-console
      console.warn('Only children of type DropdownItem or DropdownSection are allowed.');
      return [];
    },
    [],
  );

  const availableOptions = flattenedChildren;
  const [hoveredItem, setHoveredItem] = useState<number>(0);

  let selectedElement;
  const setOptionRef = (optionRef) => {
    selectedElement = optionRef;
    if (selectedElement) selectedElement.focus();
  };

  const containerRef = useRef();

  const handleKeyNavigation = (event, direction: DirectionOptionType) => {
    const newIndex = direction + hoveredItem;
    const optionsCount = availableOptions.length - 1;

    // If there's an existing item, navigate from that position
    let cursorIndex = newIndex;

    // If we've reached the end, start at the top
    if (newIndex > optionsCount) {
      cursorIndex = 0;
    }
    // If we're at the top going backwards, start at the last item
    else if (newIndex < 0) {
      cursorIndex = optionsCount;
    }

    if (availableOptions[cursorIndex] && availableOptions[cursorIndex].props) {
      const newItem = availableOptions[cursorIndex].props.option;
      setHoveredItem(cursorIndex);

      if (direction === KEYS.ENTER) {
        // $FlowFixMe[incompatible-call]
        if (onSelect) onSelect({ event, item: newItem });
        if (availableOptions[cursorIndex].props.handleSelect)
          availableOptions[cursorIndex].props.handleSelect({
            event,
            item: newItem,
          });
      }
    }

    // Scrolling
    handleContainerScrolling(direction, containerRef, selectedElement);
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === UP_ARROW) {
      handleKeyNavigation(event, KEYS.UP);
      // $FlowFixMe[prop-missing]
      event.preventDefault();
    } else if (event.keyCode === DOWN_ARROW) {
      handleKeyNavigation(event, KEYS.DOWN);
      // $FlowFixMe[prop-missing]
      event.preventDefault();
    } else if (event.keyCode === ENTER) {
      // $FlowFixMe[prop-missing]
      event.preventDefault();
      handleKeyNavigation(event, KEYS.ENTER);
    } else if (event.keyCode === ESCAPE) {
      if (anchor) anchor.focus();
      if (onDismiss) onDismiss();
    } else if (event.keyCode === TAB) {
      if (anchor) anchor.focus();
      if (onDismiss) onDismiss();
    } else if (event.keyCode === SPACE) {
      // $FlowFixMe[prop-missing]
      event.preventDefault();
    }
  };

  const renderDropdownItemsWithIndex = (dropdownChildren, idxBase) => {
    return dropdownChildren.map((child, idx) => {
      if (child.type.displayName === 'DropdownItem') {
        const index = idx + idxBase;
        return cloneElement(child, { index });
      }
      return child;
    });
  };

  /* In order to properly supply a consecutive index to each Dropdown.Item,
   * used for keyboard navigation,
   * we must clone the item and inject the index prop
   */
  const renderChildrenWithIndex = () => {
    let numItemsRendered = 0;
    const items = [];

    const dropdownChildrenArray = Children.toArray(children);

    dropdownChildrenArray.forEach((child, index) => {
      if (child.props.children && child.type.displayName === 'DropdownSection') {
        const sectionChildrenArray = Children.toArray(child.props.children);
        items.push(
          cloneElement(child, {
            children: renderDropdownItemsWithIndex(sectionChildrenArray, numItemsRendered),
          }),
        );
        numItemsRendered += child.props.children.length;
      } else if (child.type.displayName === 'DropdownItem') {
        items.push(cloneElement(child, { index }));
        numItemsRendered += 1;
      }
    });

    return items;
  };

  return (
    <Layer zIndex={zIndex}>
      <Flyout
        anchor={anchor}
        color="white"
        handleKeyDown={handleKeyDown}
        idealDirection={idealDirection}
        onDismiss={onDismiss}
        positionRelativeToAnchor={false}
        shouldFocus
        size="xl"
      >
        <Box
          id={id}
          alignItems="center"
          direction="column"
          display="flex"
          flex="grow"
          margin={2}
          role="menu"
        >
          {headerContent && <Box padding={2}>{headerContent}</Box>}
          <DropdownContext.Provider value={{ id, hoveredItem, setHoveredItem, setOptionRef }}>
            {renderChildrenWithIndex()}
          </DropdownContext.Provider>
        </Box>
      </Flyout>
    </Layer>
  );
}

Dropdown.propTypes = {
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  anchor: PropTypes.shape({
    contains: PropTypes.func,
    getBoundingClientRect: PropTypes.func,
    focus: PropTypes.func,
  }),
  children: PropTypes.node,
  headerContent: PropTypes.node,
  id: PropTypes.string.isRequired,
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  idealDirection: PropTypes.oneOf(['up', 'right', 'down', 'left']),
  onDismiss: PropTypes.func.isRequired,
  onSelect: PropTypes.func,
  zIndex: UnsafeIndexablePropType,
};

Dropdown.Item = DropdownItem;

Dropdown.Section = DropdownSection;
