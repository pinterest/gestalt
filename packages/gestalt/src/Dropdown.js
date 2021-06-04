// @flow strict
import type { Node } from 'react';

import { Children, cloneElement, useState } from 'react';
import PropTypes from 'prop-types';
import Box from './Box.js';
import Popover from './Popover.js';
import Layer from './Layer.js';
import DropdownItem from './DropdownItem.js';
import DropdownSection from './DropdownSection.js';
import { DropdownContextProvider } from './DropdownContext.js';
import { type Indexable, UnsafeIndexablePropType } from './zIndex.js';
import { type DirectionOptionType } from './utils/keyboardNavigation.js';
import { type AbstractEventHandler } from './AbstractEventHandler.js';
import { ESCAPE, SPACE, TAB, ENTER, UP_ARROW, DOWN_ARROW } from './keyCodes.js';
import { type OptionObject } from './MenuOption.js';

type IdealDirection = 'up' | 'right' | 'down' | 'left';
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
  const dropdownChildrenArray = Children.toArray(children);

  const allowedChildrenOptions = dropdownChildrenArray.reduce(
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
      console.error('Only children of type DropdownItem or DropdownSection are allowed.'); // eslint-disable-line no-console
      return [...accumulatedChildren];
    },
    [],
  );

  const [hoveredItem, setHoveredItem] = useState<number>(0);

  let selectedElement;
  const setOptionRef = (optionRef) => {
    selectedElement = optionRef;
    const linkElement = selectedElement?.getElementsByTagName('a')[0];
    if (linkElement) {
      linkElement.focus();
    } else if (selectedElement) {
      selectedElement.focus();
    }
  };

  const handleKeyNavigation = (event, direction: DirectionOptionType) => {
    const newIndex = direction + hoveredItem;
    const optionsCount = allowedChildrenOptions.length - 1;

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

    const { props: cursorOption } = allowedChildrenOptions[cursorIndex];

    if (cursorOption) {
      const item = cursorOption.option;
      setHoveredItem(cursorIndex);

      if (direction === KEYS.ENTER) {
        onSelect?.({ event, item });
        cursorOption.handleSelect?.({
          event,
          item,
        });
      }
    }
  };

  const handleKeyDown = (event) => {
    const { keyCode } = event;
    if (keyCode === UP_ARROW) {
      handleKeyNavigation(event, KEYS.UP);
      event.preventDefault();
    } else if (keyCode === DOWN_ARROW) {
      handleKeyNavigation(event, KEYS.DOWN);
      event.preventDefault();
    } else if (keyCode === ENTER) {
      event.stopPropagation();
      handleKeyNavigation(event, KEYS.ENTER);
    } else if (keyCode === ESCAPE) {
      if (anchor) anchor.focus();
      if (onDismiss) onDismiss();
    } else if (keyCode === TAB) {
      if (anchor) anchor.focus();
      if (onDismiss) onDismiss();
    } else if (keyCode === SPACE) {
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

    dropdownChildrenArray.forEach((child) => {
      const subSectionChildren = child.props.children;
      const childDisplayName = child.type.displayName;

      if (subSectionChildren && childDisplayName === 'DropdownSection') {
        const sectionChildrenArray = Children.toArray(subSectionChildren);
        items.push(
          cloneElement(child, {
            children: renderDropdownItemsWithIndex(sectionChildrenArray, numItemsRendered),
          }),
        );
        numItemsRendered += subSectionChildren.length;
      } else if (childDisplayName === 'DropdownItem') {
        items.push(cloneElement(child, { index: numItemsRendered }));
        numItemsRendered += 1;
      }
    });

    return items;
  };

  return (
    <Layer zIndex={zIndex}>
      <Popover
        anchor={anchor}
        color="white"
        handleKeyDown={handleKeyDown}
        id={id}
        idealDirection={idealDirection}
        onDismiss={onDismiss}
        role="menu"
        positionRelativeToAnchor={false}
        shouldFocus
        size="xl"
      >
        <Box alignItems="center" direction="column" display="flex" flex="grow" margin={2}>
          {Boolean(headerContent) && <Box padding={2}>{headerContent}</Box>}
          <DropdownContextProvider value={{ id, hoveredItem, setHoveredItem, setOptionRef }}>
            {renderChildrenWithIndex()}
          </DropdownContextProvider>
        </Box>
      </Popover>
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
  idealDirection: (PropTypes.oneOf([
    'up',
    'right',
    'down',
    'left',
  ]): React$PropType$Primitive<IdealDirection>),
  onDismiss: PropTypes.func.isRequired,
  onSelect: PropTypes.func,
  zIndex: UnsafeIndexablePropType,
};

Dropdown.Item = DropdownItem;

Dropdown.Section = DropdownSection;
