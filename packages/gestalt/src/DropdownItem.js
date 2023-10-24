// @flow strict
import { type Node } from 'react';
import { DropdownContextConsumer } from './Dropdown/Context.js';
import OptionItem from './Dropdown/OptionItem.js';

type BadgeType = {
  text: string,
  type?: 'info' | 'error' | 'warning' | 'success' | 'neutral' | 'darkWash' | 'lightWash',
};

type OptionItemType = {
  label: string,
  subtext?: string,
  value: string,
};

type Props = {
  /**
   * When supplied, will display a [Badge](https://gestalt.pinterest.systems/web/badge) next to the item's label. See the [Badges](https://gestalt.pinterest.systems/web/dropdown#Badges) variant to learn more.
   */
  badge?: BadgeType,
  /**
   * If needed, users can supply custom content to each Dropdown Item. This can be useful when extra functionality is needed beyond a basic Link. See the [Custom item content](https://gestalt.pinterest.systems/web/dropdown#Custom-item-content) variant to learn more.
   */
  children?: Node,
  /**
   * When supplied, will add a data-test-id prop to the dom element.
   */
  dataTestId?: string,
  /**
   * Callback when the user selects an item using the mouse or keyboard.
   */ onSelect: ({
    event: SyntheticInputEvent<HTMLInputElement>,
    item: {
      label: string,
      subtext?: string,
      value: string,
    },
  }) => void,
  /**
   * Object detailing the label, value, and optional subtext for this item.
   */
  option: OptionItemType,
  /**
   * Either the selected item info or an array of selected items, used to determine when the "selected" icon appears on an item.
   */
  selected?:
    | {
        label: string,
        subtext?: string,
        value: string,
      }
    | $ReadOnlyArray<{
        label: string,
        subtext?: string,
        value: string,
      }>
    | null,
  /**
   * Private prop used for accessibility purposes
   */
  _index?: number,
};

/**
 * Use [Dropdown.Item](https://gestalt.pinterest.systems/web/dropdown#Dropdown.Item) for action & selection, when the Dropdown item triggers an action or selects an option.
 */
export default function DropdownItem({
  badge,
  children,
  dataTestId,
  _index = 0,
  onSelect,
  option,
  selected,
}: Props): Node {
  return (
    <DropdownContextConsumer>
      {({ id, hoveredItemIndex, setHoveredItemIndex, setOptionRef }) => (
        <OptionItem
          badge={badge}
          dataTestId={dataTestId}
          hoveredItemIndex={hoveredItemIndex}
          id={id}
          index={_index}
          key={`${option.value + _index}`}
          onSelect={onSelect}
          option={option}
          ref={setOptionRef}
          selected={selected}
          setHoveredItemIndex={setHoveredItemIndex}
          textWeight="bold"
        >
          {children}
        </OptionItem>
      )}
    </DropdownContextConsumer>
  );
}

// displayName is necessary for children identification in Dropdown
DropdownItem.displayName = 'Dropdown.Item';
