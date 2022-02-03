// @flow strict
import { Children, cloneElement, type Node, useState } from 'react';
import Box from './Box.js';
import Popover from './Popover.js';
import Layer from './Layer.js';
import DropdownItem from './DropdownItem.js';
import DropdownLink from './DropdownLink.js';
import DropdownSection from './DropdownSection.js';
import { DropdownContextProvider } from './DropdownContext.js';
import { type Indexable } from './zIndex.js';
import { type DirectionOptionType } from './utils/keyboardNavigation.js';
import { ESCAPE, SPACE, TAB, ENTER, UP_ARROW, DOWN_ARROW } from './keyCodes.js';

const KEYS = {
  UP: -1,
  DOWN: 1,
  ENTER: 0,
};

const dropdownItemDisplayNames = ['DropdownItem', 'DropdownLink'];

function getChildrenOptions(childrenArray) {
  return childrenArray.reduce((accumulatedChildren, currentChild) => {
    const {
      props: { children: currentItemChildren },
      type: { displayName },
    } = currentChild;

    if (currentItemChildren && displayName === 'DropdownSection') {
      return [
        ...accumulatedChildren,
        ...(Array.isArray(currentItemChildren) ? currentItemChildren : [currentItemChildren]),
      ];
    }

    if (dropdownItemDisplayNames.includes(displayName)) {
      return [...accumulatedChildren, currentChild];
    }

    // eslint-disable-next-line no-console
    console.error(
      'Only children of type DropdownItem, DropdownLink, or DropdownSection are allowed.',
    );

    return [...accumulatedChildren];
  }, []);
}

/* In order to properly supply a consecutive index to each Dropdown.Item,
 * used for keyboard navigation,
 * we must clone the item and inject the index prop
 */
const renderDropdownItemsWithIndex = (dropdownChildren, idxBase) =>
  dropdownChildren.map((child, idx) => {
    if (dropdownItemDisplayNames.includes(child.type.displayName)) {
      const index = idx + idxBase;
      return cloneElement(child, { index });
    }
    return child;
  });

const renderChildrenWithIndex = (childrenArray) => {
  let numItemsRendered = 0;

  return childrenArray.reduce((acc, child) => {
    const subSectionChildren = child.props.children;
    const childDisplayName = child.type.displayName;

    if (subSectionChildren && childDisplayName === 'DropdownSection') {
      const sectionChildrenArray = Children.toArray(subSectionChildren);
      const childWithIndex = cloneElement(child, {
        children: renderDropdownItemsWithIndex(sectionChildrenArray, numItemsRendered),
      });
      numItemsRendered += sectionChildrenArray.length;
      return [...acc, childWithIndex];
    }
    if (dropdownItemDisplayNames.includes(childDisplayName)) {
      const childWithIndex = cloneElement(child, { _index: numItemsRendered });
      numItemsRendered += 1;
      return [...acc, childWithIndex];
    }
    return acc;
  }, []);
};

type Props = {|
  /**
   * Ref for the element that the Dropdown will attach to, will most likely be a [Button](/button). See the [Accessibility](https://gestalt.netlify.app/dropdown#Accessibility) guidelines to learn more.
   */
  anchor?: ?HTMLElement,
  /**
   * Must be instances of [Dropdown.Item](https://gestalt.netlify.app/dropdown#Types-of-items), [Dropdown.Link](https://gestalt.netlify.app/dropdown#Types-of-items) or [Dropdown.Section](https://gestalt.netlify.app/dropdown#Sections) components. See the [Types of items](https://gestalt.netlify.app/dropdown#Types-of-items) variant to learn more.
   */
  children: Node,
  /**
   * Enables correct behavior when Dropdown is used within a fixed container. To achieve this it removes the Layer component around Popover and enables positioning relative to its anchor element. Should only be used in cases where Layer breaks the Dropdown positionings such as when the anchor element is within a sticky component.
   */
  isWithinFixedContainer?: boolean,
  /**
   * Content to display at the top of the Dropdown before any items or sections. See the [Custom header](https://gestalt.netlify.app/dropdown#Custom-header) variant to learn more.
   */
  headerContent?: Node,
  /**
   * Unique id to identify each Dropdown. Used for [Accessibility](https://gestalt.netlify.app/dropdown#Accessibility) purposes.
   */
  id: string,
  /**
   * Preferred direction for the Dropdown to open.
   */
  idealDirection?: 'up' | 'right' | 'down' | 'left',
  /**
   * Callback fired when the menu is closed.
   */
  onDismiss: () => void,
  /**
   * An object representing the zIndex value of the Dropdown menu. Learn more about [zIndex classes](https://gestalt.netlify.app/zindex_classes)
   */
  zIndex?: Indexable,
|};

/**
 * [Dropdown](https://gestalt.pinterest.systems/dropdown) displays a list of actions, options or links. It is triggered when a user interacts with a Button, Textfield or other control. Dropdown allows for complex functionality that can’t be accomplished with SelectList.
 */
export default function Dropdown({
  anchor,
  children,
  isWithinFixedContainer = false,
  headerContent,
  id,
  idealDirection = 'down',
  onDismiss,
  zIndex,
}: Props): Node {
  const [hoveredItem, setHoveredItem] = useState<number>(0);

  const dropdownChildrenArray = Children.toArray(children);
  const allowedChildrenOptions = getChildrenOptions(dropdownChildrenArray);

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
        cursorOption.onSelect?.({
          event,
          item,
        });
      }
    }
  };

  const onKeyDown = ({ event }) => {
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
    } else if ([ESCAPE, TAB].includes(keyCode)) {
      anchor?.focus();
      onDismiss?.();
    } else if (keyCode === SPACE) {
      event.preventDefault();
    }
  };

  const dropdown = (
    <Popover
      anchor={anchor}
      color="white"
      onKeyDown={onKeyDown}
      id={id}
      idealDirection={idealDirection}
      onDismiss={onDismiss}
      positionRelativeToAnchor={isWithinFixedContainer}
      role="menu"
      shouldFocus
      size="xl"
    >
      <Box alignItems="center" direction="column" display="flex" flex="grow" margin={2}>
        {Boolean(headerContent) && <Box padding={2}>{headerContent}</Box>}

        <DropdownContextProvider value={{ id, hoveredItem, setHoveredItem, setOptionRef }}>
          {renderChildrenWithIndex(dropdownChildrenArray)}
        </DropdownContextProvider>
      </Box>
    </Popover>
  );

  return isWithinFixedContainer ? dropdown : <Layer zIndex={zIndex}>{dropdown}</Layer>;
}

Dropdown.Item = DropdownItem;
Dropdown.Link = DropdownLink;
Dropdown.Section = DropdownSection;
