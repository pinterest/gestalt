// @flow strict
import { type Node } from 'react';
import OptionItem, { type OptionItemType } from './OptionItem.js';
import { DropdownContextConsumer } from './DropdownContext.js';

type PublicProps = {|
  badgeText?: string,
  children?: Node,
  onSelect: ({|
    event: SyntheticInputEvent<HTMLInputElement>,
    item: OptionItemType,
  |}) => void,
  option: OptionItemType,
  selected?: OptionItemType | $ReadOnlyArray<OptionItemType> | null,
|};

type PrivateProps = {|
  index?: number,
|};

type Props = {|
  ...PublicProps,
  ...PrivateProps,
|};

/**
 * https://gestalt.pinterest.systems/Dropdown
 */
export default function DropdownItem({
  badgeText,
  children,
  onSelect,
  index = 0,
  option,
  selected,
}: Props): Node {
  return (
    <DropdownContextConsumer>
      {({ id, hoveredItem, setHoveredItem, setOptionRef }) => (
        <OptionItem
          badgeText={badgeText}
          hoveredItemIndex={hoveredItem}
          id={id}
          index={index}
          key={`${option.value + index}`}
          onSelect={onSelect}
          option={option}
          ref={setOptionRef}
          role="menuitem"
          selected={selected}
          setHoveredItemIndex={setHoveredItem}
          shouldTruncate
          textWeight="bold"
        >
          {children}
        </OptionItem>
      )}
    </DropdownContextConsumer>
  );
}

// displayName is necessary for children identification in Dropdown
DropdownItem.displayName = 'DropdownItem';
