// @flow strict
import { type Node } from 'react';
import OptionItem, { type OptionItemType } from './OptionItem.js';
import { DropdownContextConsumer } from './DropdownContext.js';

type PublicProps = {|
  badgeText?: string,
  children?: Node,
  dataTestId?: string,
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
 * https://gestalt.pinterest.systems/dropdown
 */
export default function DropdownItem({
  badgeText,
  children,
  dataTestId,
  index = 0,
  onSelect,
  option,
  selected,
}: Props): Node {
  return (
    <DropdownContextConsumer>
      {({ id, hoveredItem, setHoveredItem, setOptionRef }) => (
        <OptionItem
          badgeText={badgeText}
          dataTestId={dataTestId}
          hoveredItemIndex={hoveredItem}
          id={id}
          index={index}
          key={`${option.value + index}`}
          lineClamp={1}
          onSelect={onSelect}
          option={option}
          ref={setOptionRef}
          role="menuitem"
          selected={selected}
          setHoveredItemIndex={setHoveredItem}
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
