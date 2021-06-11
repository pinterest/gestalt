// @flow strict
import { Children, cloneElement, type Node, useState } from 'react';
import PropTypes from 'prop-types';
import Box from './Box.js';
import Popover from './Popover.js';
import Layer from './Layer.js';
import DropdownItem from './DropdownItem.js';
import DropdownLink from './DropdownLink.js';
import DropdownSection from './DropdownSection.js';
import { DropdownContextProvider } from './DropdownContext.js';
import { type Indexable, UnsafeIndexablePropType } from './zIndex.js';
import { type DirectionOptionType } from './utils/keyboardNavigation.js';
import { ESCAPE, SPACE, TAB, ENTER, UP_ARROW, DOWN_ARROW } from './keyCodes.js';

const KEYS = {
  UP: -1,
  DOWN: 1,
  ENTER: 0,
};

const dropdownItemDisplayNames = ['DropdownItem', 'DropdownLink'];

type IdealDirection = 'up' | 'right' | 'down' | 'left';

type Props = {|
  anchor?: ?HTMLElement,
  children: Node,
  headerContent?: Node,
  id: string,
  idealDirection?: IdealDirection,
  onDismiss: () => void,
  zIndex?: Indexable,
|};

/**
 * https://gestalt.pinterest.systems/Dropdown
 */
export default function Dropdown({
  anchor,
  children,
  headerContent,
  id,
  idealDirection = 'down',
  onDismiss,
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
      if (dropdownItemDisplayNames.includes(displayName)) {
        return [...accumulatedChildren, currentChild];
      }
      // eslint-disable-next-line no-console
      console.error(
        'Only children of type DropdownItem, DropdownLink, or DropdownSection are allowed.',
      );
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
        cursorOption.onSelect?.({
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
    } else if ([ESCAPE, TAB].includes(keyCode)) {
      anchor?.focus();
      onDismiss?.();
    } else if (keyCode === SPACE) {
      event.preventDefault();
    }
  };

  const renderDropdownItemsWithIndex = (dropdownChildren, idxBase) => {
    return dropdownChildren.map((child, idx) => {
      if (dropdownItemDisplayNames.includes(child.type.displayName)) {
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

    return dropdownChildrenArray.reduce((acc, child) => {
      const subSectionChildren = child.props.children;
      const childDisplayName = child.type.displayName;

      if (subSectionChildren && childDisplayName === 'DropdownSection') {
        const sectionChildrenArray = Children.toArray(subSectionChildren);
        const childWithIndex = cloneElement(child, {
          children: renderDropdownItemsWithIndex(sectionChildrenArray, numItemsRendered),
        });
        numItemsRendered += subSectionChildren.length;
        return [...acc, childWithIndex];
      }
      if (dropdownItemDisplayNames.includes(childDisplayName)) {
        const childWithIndex = cloneElement(child, { index: numItemsRendered });
        numItemsRendered += 1;
        return [...acc, childWithIndex];
      }
      return acc;
    }, []);
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
        positionRelativeToAnchor={false}
        role="menu"
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
  // $FlowFixMe[incompatible-cast]
  anchor: (PropTypes.shape({
    contains: PropTypes.func,
    focus: PropTypes.func,
    getBoundingClientRect: PropTypes.func,
  }): ?HTMLElement),
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
  zIndex: UnsafeIndexablePropType,
};

Dropdown.Item = DropdownItem;
Dropdown.Link = DropdownLink;
Dropdown.Section = DropdownSection;
