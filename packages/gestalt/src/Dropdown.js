// @flow strict
import { Fragment, Children, cloneElement, type Node, useState } from 'react';
import Box from './Box.js';
import DropdownItem from './DropdownItem.js';
import DropdownLink from './DropdownLink.js';
import DropdownSection from './DropdownSection.js';
import { ESCAPE, SPACE, TAB, ENTER, UP_ARROW, DOWN_ARROW } from './keyCodes.js';
import Layer from './Layer.js';
import Popover from './Popover.js';
import { type Indexable } from './zIndex.js';
import AnimationProvider from './animation/AnimationContext.js';
import RequestAnimationFrameProvider from './animation/RequestAnimationFrameContext.js';
import { useDeviceType } from './contexts/DeviceTypeProvider.js';
import { DropdownContextProvider } from './Dropdown/Context.js';
import PartialPage from './SheetMobile/PartialPage.js';
import { type DirectionOptionType } from './utils/keyboardNavigation.js';

const KEYS = {
  UP: -1,
  DOWN: 1,
  ENTER: 0,
};

const dropdownItemDisplayNames = ['Dropdown.Item', 'Dropdown.Link'];

// $FlowFixMe[missing-local-annot]
function getChildrenOptions(childrenArray) {
  return childrenArray.reduce((accumulatedChildren, currentChild) => {
    const {
      props: { children: currentItemChildren },
      type,
      type: { displayName },
    } = currentChild;

    if ((currentItemChildren && displayName === 'Dropdown.Section') || type === Fragment) {
      return [
        ...accumulatedChildren,
        ...(Array.isArray(currentItemChildren)
          ? currentItemChildren.flat()
          : [currentItemChildren]),
      ];
    }

    if (dropdownItemDisplayNames.includes(displayName)) {
      return [...accumulatedChildren, currentChild];
    }

    // eslint-disable-next-line no-console
    console.error(
      'Only children of type Dropdown.Item, Dropdown.Link, or Dropdown.Section are allowed.',
    );

    return [...accumulatedChildren];
  }, []);
}

/* In order to properly supply a consecutive index to each Dropdown.Item,
 * used for keyboard navigation,
 * we must clone the item and inject the index prop
 */
// $FlowFixMe[missing-local-annot]
const renderDropdownItemsWithIndex = (dropdownChildren, idxBase: number) =>
  dropdownChildren.map((child, idx) => {
    if (dropdownItemDisplayNames.includes(child.type.displayName)) {
      const index = idx + idxBase;
      return cloneElement(child, { _index: index });
    }
    return child;
  });

// $FlowFixMe[missing-local-annot]
const renderChildrenWithIndex = (childrenArray) => {
  let numItemsRendered = 0;

  return childrenArray.reduce((acc, child) => {
    const subSectionChildren = child.props.children;
    const childDisplayName = child.type.displayName;

    if (
      (subSectionChildren && childDisplayName === 'Dropdown.Section') ||
      child.type === Fragment
    ) {
      const sectionChildrenArray = Children.toArray<Node>(subSectionChildren).flat();

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
   * Ref for the element that the Dropdown will attach to, will most likely be a [Button](https://gestalt.pinterest.systems/web/button). See the [Accessibility](https://gestalt.pinterest.systems/web/dropdown#Accessibility) guidelines to learn more.
   */
  anchor?: ?HTMLElement,
  /**
   * Must be instances of [Dropdown.Item](https://gestalt.pinterest.systems/web/dropdown#Types-of-items), [Dropdown.Link](https://gestalt.pinterest.systems/web/dropdown#Types-of-items) or [Dropdown.Section](https://gestalt.pinterest.systems/web/dropdown#Sections) components. See the [Types of items](https://gestalt.pinterest.systems/web/dropdown#Types-of-items) variant to learn more.
   */
  children: Node,
  /**
   * Enables correct behavior when Dropdown is used within a fixed container. To achieve this it removes the Layer component around Popover and enables positioning relative to its anchor element. Should only be used in cases where Layer breaks the Dropdown positionings such as when the anchor element is within a sticky component.
   */
  isWithinFixedContainer?: boolean,
  /**
   * Content to display at the top of the Dropdown before any items or sections. See the [Custom header](https://gestalt.pinterest.systems/web/dropdown#Custom-header) variant to learn more.
   */
  headerContent?: Node,
  /**
   * Unique id to identify each Dropdown. Used for [Accessibility](https://gestalt.pinterest.systems/web/dropdown#Accessibility) purposes.
   */
  id: string,
  /**
   * Preferred direction for the Dropdown to open.
   */
  idealDirection?: 'up' | 'right' | 'down' | 'left',
  /**
   *  Define a controlled size to dropdown's Popover.
   */
  maxHeight?: '30vh',
  /**
   * Mobile-only prop. Callback fired when Dropdown's in & out animations end. See the [mobile variant](https://gestalt.pinterest.systems/web/dropdown#mobile) to learn more.
   */
  mobileOnAnimationEnd?: ({| animationState: 'in' | 'out' |}) => void,
  /**
   * Callback fired when the menu is closed.
   */
  onDismiss: () => void,
  /**
   * Dropdown can adapt to mobile devices to [SheetMobile](https://gestalt.pinterest.systems/web/sheetmobile). Mobile adaptation is disabled by default. Set to 'false' to enable SheetMobile in mobile devices. See the [mobile variant](https://gestalt.pinterest.systems/web/dropdown#mobile) to learn more.
   */
  disableMobileUI?: boolean,
  /**
   * An object representing the zIndex value of the Dropdown menu. Learn more about [zIndex classes](https://gestalt.pinterest.systems/web/zindex_classes)
   */
  zIndex?: Indexable,
|};

/**
 * [Dropdown](https://gestalt.pinterest.systems/web/dropdown) displays a list of actions, options or links. It is triggered when a user interacts with a Button, Textfield or other control. Dropdown allows for complex functionality that can’t be accomplished with SelectList.
 *
 * ![Dropdown open light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Dropdown-open.spec.mjs-snapshots/Dropdown-open-chromium-darwin.png)
 * ![Dropdown open dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Dropdown-open-dark.spec.mjs-snapshots/Dropdown-open-dark-chromium-darwin.png)
 *
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
  maxHeight,
  mobileOnAnimationEnd,
  disableMobileUI = true,
}: Props): Node {
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';

  const [hoveredItemIndex, setHoveredItemIndex] = useState<?number>(isMobile ? undefined : 0);

  const dropdownChildrenArray = Children.toArray<Node>(children);
  const allowedChildrenOptions = getChildrenOptions(dropdownChildrenArray);

  let selectedElement;
  const setOptionRef = (optionRef: ?HTMLElement) => {
    selectedElement = optionRef;
    const linkElement = selectedElement?.getElementsByTagName('a')[0];
    if (linkElement) {
      linkElement.focus();
    } else if (selectedElement) {
      selectedElement.focus();
    }
  };

  const handleKeyNavigation = (
    event: SyntheticKeyboardEvent<HTMLElement>,
    direction: DirectionOptionType,
  ) => {
    const newIndex = direction + (hoveredItemIndex ?? 0);
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
      setHoveredItemIndex(cursorIndex);

      if (direction === KEYS.ENTER) {
        cursorOption.onSelect?.({
          event,
          item,
        });
      }
    }
  };

  const onKeyDown = ({ event }: {| event: SyntheticKeyboardEvent<HTMLElement> |}) => {
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
  if (isMobile && !disableMobileUI) {
    return (
      <AnimationProvider>
        <RequestAnimationFrameProvider>
          <PartialPage
            align="start"
            padding="default"
            onDismiss={onDismiss}
            onAnimationEnd={mobileOnAnimationEnd}
            role="dialog"
            showDismissButton
            size="auto"
            zIndex={zIndex}
          >
            {headerContent}
            <DropdownContextProvider
              value={{ id, hoveredItemIndex, setHoveredItemIndex, setOptionRef }}
            >
              {renderChildrenWithIndex(dropdownChildrenArray)}
            </DropdownContextProvider>
          </PartialPage>
        </RequestAnimationFrameProvider>
      </AnimationProvider>
    );
  }

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
      __dangerouslySetMaxHeight={maxHeight}
    >
      <Box
        alignItems="center"
        direction="column"
        display="flex"
        flex="grow"
        margin={2}
        maxHeight={maxHeight}
      >
        {Boolean(headerContent) && <Box padding={2}>{headerContent}</Box>}

        <DropdownContextProvider
          value={{ id, hoveredItemIndex, setHoveredItemIndex, setOptionRef }}
        >
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
