// @flow strict
import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import MenuOption from './MenuOption.js';

type OptionObject = {|
  label: string,
  value: string,
  subtext?: string,
|};

type OptionProps = {|
  badgeText?: string,
  children?: Node,
  index?: number,
  isExternal?: boolean,
  /* the option with value and label */
  option: OptionObject,
  selected?: OptionObject | Array<OptionObject> | null,
  handleSelect?: ({|
    item: OptionObject,
    event: SyntheticFocusEvent<HTMLInputElement>,
  |}) => void,
  hoveredItem?: ?number,
  setHoveredItem?: (number) => void,
  setOptionRef?: (?HTMLElement) => void,
  url?: string,
|};

export default function DropdownItem({
  badgeText,
  children,
  handleSelect,
  hoveredItem,
  index = 0,
  isExternal,
  option,
  selected,
  setHoveredItem,
  setOptionRef,
  url,
}: OptionProps): Node {
  return (
    <MenuOption
      key={`${option.value + index}`}
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
    >
      {children}
    </MenuOption>
  );
}

DropdownItem.displayName = 'DropdownItem';

DropdownItem.propTypes = {
  badgeText: PropTypes.string,
  index: PropTypes.number,
  isExternal: PropTypes.bool,
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  option: PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    subtext: PropTypes.string,
  }).isRequired,
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  selected: PropTypes.oneOfType([
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      subtext: PropTypes.string,
    }),
    PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        subtext: PropTypes.string,
      })
    ),
  ]),
  handleSelect: PropTypes.func,
  hoveredItem: PropTypes.number,
  setHoveredItem: PropTypes.func,
  setOptionRef: PropTypes.func,
};
