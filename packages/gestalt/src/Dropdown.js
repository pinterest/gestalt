// @flow strict
// flowlint unclear-type:off
import React, { useState, useRef, type Node, type ComponentType } from 'react';
import PropTypes from 'prop-types';
import Box from './Box.js';
import Flyout from './Flyout.js';
import Layer from './Layer.js';
import DropdownItem from './DropdownItem.js';
import DropdownSection from './DropdownSection.js';
import handleScrolling from './utils/keyboardNavigation.js';

type OptionObject = {|
  label: string,
  value: string,
  subtext?: string,
|};
type Props = {|
  anchor?: ?HTMLElement,
  children: Array<Object>,
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
  idealDirection = 'down',
  onDismiss,
  onSelect,
}: Props): Node {
  const getFlattenedChildren = (
    dropdownChildren: ComponentType<{|
      props: Object,
      type: {| name: string |},
    |}>[]
  ) => {
    const items = dropdownChildren.map((child) => {
      // $FlowFixMe[prop-missing] flow 0.135.0 upgrade
      if (child.props.children && child.type.name === 'DropdownSection') {
        return child.props.children;
      }
      // $FlowFixMe[prop-missing] flow 0.135.0 upgrade
      if (child.type.name === 'DropdownItem') {
        return child;
      }
      return null;
    });

    return items.flat();
  };

  const availableOptions = getFlattenedChildren(children);
  const [hoveredItem, setHoveredItem] = useState<number | null>(0);

  let selectedElement;
  const setOptionRef = (optionRef) => {
    selectedElement = optionRef;
  };

  const containerRef = useRef();

  const handleKeyNavigation = (
    event: SyntheticKeyboardEvent<HTMLInputElement>,
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

    // $FlowFixMe[incompatible-use] flow 0.135.0 upgrade
    // $FlowFixMe[prop-missing] flow 0.135.0 upgrade
    const newItem = availableOptions[cursorIndex].props.option;
    setHoveredItem(cursorIndex);

    if (direction === KEYS.ENTER) {
      if (onSelect) onSelect({ event, item: newItem });
      // $FlowFixMe[incompatible-use] flow 0.135.0 upgrade
      // $FlowFixMe[prop-missing] flow 0.135.0 upgrade
      if (availableOptions[cursorIndex].props.handleSelect)
        availableOptions[cursorIndex].props.handleSelect({
          event,
          item: newItem,
        });
    }
    // Scrolling
    handleScrolling(direction, containerRef, selectedElement);
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
      if (onDismiss) onDismiss();
    }

    // Tab Key
    else if (event.keyCode === 9) {
      if (onDismiss) onDismiss();
    }

    // Space Key
    else if (event.keyCode === 32) {
      event.preventDefault();
    }
  };

  const renderDropdownItems = (dropdownChildren, idxBase) => {
    return React.Children.map(dropdownChildren, (child, idx) => {
      const props = {
        hoveredItem,
        setHoveredItem,
        setOptionRef,
      };
      if (React.isValidElement(child)) {
        const index = idx + idxBase;
        const key = `option-${index}`;
        return React.cloneElement(child, { ...props, index, key });
      }
      return child;
    });
  };

  const renderDropdownChildren = (dropdownChildren: Array<Object>) => {
    let numItemsRendered = 0;
    const items = [];
    const props = {
      hoveredItem,
      setHoveredItem,
      setOptionRef,
    };

    dropdownChildren.forEach((child: Object, index) => {
      if (child.props.children && child.type.name === 'DropdownSection') {
        const key = `section-${child.props.label}`;
        items.push(
          React.cloneElement(child, {
            children: renderDropdownItems(
              child.props.children,
              numItemsRendered
            ),
            key,
          })
        );
        numItemsRendered += child.props.children.length;
      } else if (React.isValidElement(child)) {
        const key = `option-${index}`;
        items.push(React.cloneElement(child, { ...props, index, key }));
        numItemsRendered += 1;
      }
    });

    return items;
  };

  return (
    <Layer>
      <Flyout
        anchor={anchor}
        color="white"
        handleKeyDown={handleKeyDown}
        idealDirection={idealDirection}
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
