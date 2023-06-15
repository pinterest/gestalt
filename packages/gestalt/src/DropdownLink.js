// @flow strict
import { type Node } from 'react';
import { DropdownContextConsumer } from './Dropdown/Context.js';
import OptionItem from './Dropdown/OptionItem.js';

type BadgeType = {|
  text: string,
  type?: 'info' | 'error' | 'warning' | 'success' | 'neutral' | 'darkWash' | 'lightWash',
|};

type OptionItemType = {|
  label: string,
  subtext?: string,
  value: string,
|};

type Props = {|
  /**
   * When supplied, will display a [Badge](https://gestalt.pinterest.systems/web/badge) next to the item's label. See the [Badges](https://gestalt.pinterest.systems/web/dropdown#Badges) variant to learn more.
   */
  badge?: BadgeType,
  /**
   * If needed, users can supply custom content to each Dropdown Link. This can be useful when extra functionality is needed beyond a basic Link. See the [Custom item content](https://gestalt.pinterest.systems/web/dropdown#Custom-item-content) variant to learn more.
   */
  children?: Node,
  /**
   * When supplied, will add a data-test-id prop to the dom element.
   */
  dataTestId?: string,
  /**
   * Directs users to the url when item is selected. See the [Types of items](https://gestalt.pinterest.systems/web/dropdown#Types-of-items) variant to learn more.
   */
  href: string,
  /**
   * When true, adds an arrow icon to the end of the item to signal this item takes users to an external source and opens the link in a new tab. Do not add if the item navigates users within the app. See the [Best practices](https://gestalt.pinterest.systems/web/dropdown#Best-practices) for more info.
   */
  isExternal?: boolean,
  /**
   * Callback fired when clicked (pressed and released) with a mouse or keyboard. See [GlobalEventsHandlerProvider](https://gestalt.pinterest.systems/web/utilities/globaleventshandlerprovider#Link-handlers) to learn more about link navigation. To learn more about `mobileOnDismissStart`, see the [animation variant in SheetMobile](https://deploy-preview-2879--gestalt.netlify.app/web/sheetmobile#Animation). `mobileOnDismissStart` is the equivalent of `onDismissStart` in SheetMobile.
   */
  onClick?: ({|
    event: SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement>,
    dangerouslyDisableOnNavigation: () => void,
    mobileOnDismissStart: () => void,
  |}) => void,
  /**
   * Object detailing the label, value, and optional subtext for this item.
   */
  option: OptionItemType,
  /**
   * Private prop used for accessibility purposes
   */
  _index?: number,
|};

/**
 * Use [Dropdown.Link](https://gestalt.pinterest.systems/dropdownDropdown.Link) for navigation, when the Dropdown item navigates to a new page.
 */
export default function DropdownLink({
  badge,
  children,
  dataTestId,
  href,
  _index = 0,
  isExternal,
  onClick,
  option,
}: Props): Node {
  return (
    <DropdownContextConsumer>
      {({ id, hoveredItemIndex, setHoveredItemIndex, setOptionRef }) => (
        <OptionItem
          badge={badge}
          dataTestId={dataTestId}
          hoveredItemIndex={hoveredItemIndex}
          href={href}
          id={id}
          index={_index}
          isExternal={isExternal}
          key={`${option.value + _index}`}
          onClick={onClick}
          option={option}
          setHoveredItemIndex={setHoveredItemIndex}
          ref={setOptionRef}
          textWeight="bold"
        >
          {children}
        </OptionItem>
      )}
    </DropdownContextConsumer>
  );
}

// displayName is necessary for children identification in Dropdown
DropdownLink.displayName = 'Dropdown.Link';
