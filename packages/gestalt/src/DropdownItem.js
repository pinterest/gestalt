// @flow strict
import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import MenuOption from './MenuOption.js';

type OptionObject = {|
  label: string,
  value: string,
|};

type OptionProps = {|
  index: number,
  /* the option with value and label */
  option: OptionObject,
  selected?: OptionObject | null,
  handleSelect: ({|
    item: OptionObject,
    event: SyntheticFocusEvent<HTMLInputElement>,
  |}) => void,
  hoveredItem: ?number,
  setHoveredItem: (number) => void,
  setOptionRef: (?HTMLElement) => void,
  url?: string,
|};

export default function DropdownItem({
  badgeText,
  handleSelect,
  hoveredItem,
  index,
  isExternal,
  option,
  selected,
  setHoveredItem,
  setOptionRef,
  url,
}: OptionProps): Node {
  return (
    <MenuOption
      badgeText={badgeText}
      handleSelect={handleSelect}
      hoveredItem={hoveredItem}
      index={index}
      isExternal={isExternal}
      option={option}
      role="menuitem"
      selected={selected}
      setHoveredItem={setHoveredItem}
      setOptionRef={setOptionRef}
      shouldTruncate
      textWeight="bold"
      url={url}
    />
  );
}

DropdownItem.displayName = 'DropdownItem';

DropdownItem.propTypes = {
  index: PropTypes.number.isRequired,
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  option: PropTypes.exact({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  selected: PropTypes.exact({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }),
  handleSelect: PropTypes.func,
  hoveredItem: PropTypes.number,
  setHoveredItem: PropTypes.func,
  setOptionRef: PropTypes.func,
};
