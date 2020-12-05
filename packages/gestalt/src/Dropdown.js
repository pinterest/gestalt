// @flow strict
import React, { useState, useRef, type Node } from 'react';
import PropTypes from 'prop-types';
import Box from './Box.js';
import Flyout from './Flyout.js';
import Layer from './Layer.js';
import styles from './Dropdown.css';
import DropdownItem from './DropdownItem.js';
import DropdownSection from './DropdownSection.js';

type Props = {|
  anchor?: ?HTMLElement,
  children: Node,
  headerContent?: Node,
  idealDirection?: 'up' | 'right' | 'down' | 'left',
  onDismiss: () => void,
  onSelect?: ({|
    event:
      | SyntheticFocusEvent<HTMLInputElement>
      | SyntheticKeyboardEvent<HTMLInputElement>,
    item: ?OptionObject,
  |}) => void,
|};

export default function Dropdown({
  anchor,
  children,
  headerContent,
  idealDirection,
  onDismiss,
  onSelect,
}: Props): Node {
  const getFlattenedChildren = (dropdownChildren) => {
    const items = [];
    for (let i = 0; i < dropdownChildren.length; i += 1) {
      if (
        dropdownChildren[i].props.children &&
        dropdownChildren[i].type.name === 'DropdownSection'
      ) {
        items.push(dropdownChildren[i].props.children);
      } else if (dropdownChildren[i].type.name === 'DropdownItem') {
        items.push(dropdownChildren[i]);
      }
    }
    return items.flat();
  };

  const availableOptions = getFlattenedChildren(children);
  const [hoveredItem, setHoveredItem] = useState<number | null>(0);

  let selectedElement;
  const setOptionRef = (optionRef) => {
    selectedElement = optionRef;
  };

  const containerRef = useRef();

  const handleScrolling = (direction: number) => {
    const container = containerRef.current;

    // Based on keyboard navigation we get the next or previous option
    // When we reach the start or end of the list, move to the start or end of the list based on the direction
    const nextOption =
      direction > 0
        ? selectedElement?.nextSibling
        : selectedElement?.previousSibling;

    // Handles which option to display once we've hit the end of the list range
    const endRangeOption =
      direction > 0
        ? container?.firstChild?.firstChild
        : container?.firstChild?.lastChild;

    const selectedOption = nextOption || endRangeOption;

    // If one of these nodes is missing exit early
    if (!container || !selectedOption) return;

    const containerHeight = container.getClientRects()[0].height;
    const overScroll =
      selectedOption instanceof HTMLElement && selectedOption?.offsetHeight / 3;

    const scrollPos =
      selectedOption instanceof HTMLElement &&
      selectedOption.offsetTop +
        selectedOption.clientHeight -
        containerHeight +
        overScroll;

    container.scrollTop = scrollPos;
  };

  const handleKeyNavigation = (
    event: {| keyCode: number |},
    direction: -1 | 0 | 1
  ) => {
    // $FlowFixMe[unsafe-addition] flow 0.135.0 upgrade
    const newIndex = direction + hoveredItem;
    const optionsCount = availableOptions.length - 1;

    const KEYS = {
      ENTER: 0,
    };

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

    const newItem = availableOptions[cursorIndex].props.option;
    setHoveredItem(cursorIndex);

    if (direction === KEYS.ENTER) {
      if (onSelect) onSelect({ event, item: newItem });
      if (availableOptions[cursorIndex].props.handleSelect)
        availableOptions[cursorIndex].props.handleSelect({
          event,
          item: newItem,
        });
    }
    // Scrolling
    handleScrolling(direction);
  };

  const handleKeyDown = (event) => {
    const KEYS = {
      UP: -1,
      DOWN: 1,
      ENTER: 0,
    };
    // Up Arrow
    if (event.keyCode === 38) {
      handleKeyNavigation(event, KEYS.UP);
      event.preventDefault();
    }
    // Down Arrow
    else if (event.keyCode === 40) {
      handleKeyNavigation(event, KEYS.DOWN);
      event.preventDefault();
    }
    // Enter Key
    else if (event.keyCode === 13) {
      handleKeyNavigation(event, KEYS.ENTER);
      event.preventDefault();
    }

    // ESC Key
    else if (event.keyCode === 27) {
      if (onDismiss) onDismiss({ event });
    }

    // Tab Key
    else if (event.keyCode === 9) {
      if (onDismiss) onDismiss({ event });
    }

    // Space Key
    else if (event.keyCode === 32) {
      event.preventDefault();
    }
  };

  const renderDropdownItem = (dropdownChildren, idxBase) => {
    return React.Children.map(dropdownChildren, (child, idx) => {
      const props = {
        hoveredItem,
        setHoveredItem,
        setOptionRef,
      };
      if (React.isValidElement(child)) {
        console.log({ child });
        const index = idx + idxBase;
        return React.cloneElement(child, { ...props, index });
      }
      return child;
    });
  };

  const renderDropdownChildren = (dropdownChildren) => {
    let numItemsRendered = 0;
    const items = [];
    const props = {
      hoveredItem,
      setHoveredItem,
      setOptionRef,
    };
    for (let i = 0; i < dropdownChildren.length; i += 1) {
      if (
        dropdownChildren[i].props.children &&
        dropdownChildren[i].type.name === 'DropdownSection'
      ) {
        items.push(
          React.cloneElement(dropdownChildren[i], {
            children: renderDropdownItem(
              dropdownChildren[i].props.children,
              numItemsRendered
            ),
          })
        );
        numItemsRendered += dropdownChildren[i].props.children.length;
      } else if (React.isValidElement(dropdownChildren[i])) {
        const index = i;

        items.push(
          React.cloneElement(dropdownChildren[i], { ...props, index })
        );
        numItemsRendered += 1;
      }
    }
    return items;
  };

  return (
    <Layer>
      <Flyout
        anchor={anchor}
        color="white"
        handleKeyDown={handleKeyDown}
        idealDirection={idealDirection || 'down'}
        onDismiss={onDismiss}
        positionRelativeToAnchor={false}
        size="xl"
      >
        <Box
          alignItems="center"
          direction="column"
          display="flex"
          flex="grow"
          margin={2}
          role="menu"
          aria-activedescendant={hoveredItem}
        >
          {headerContent && <Box padding={2}>{headerContent}</Box>}
          {renderDropdownChildren(children)}
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
  }),
  children: PropTypes.node,
  headerContent: PropTypes.node,
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  idealDirection: PropTypes.oneOf(['up', 'right', 'down', 'left']),
  onDismiss: PropTypes.func.isRequired,
  onSelect: PropTypes.func,
};

Dropdown.Item = DropdownItem;

Dropdown.Section = DropdownSection;
