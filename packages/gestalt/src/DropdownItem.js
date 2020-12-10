// @flow strict
import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import MenuOption from './MenuOption.js';
import DropdownContext from './DropdownContextProvider.js';

type OptionObject = {|
  label: string,
  value: string,
  subtext?: string,
|};

type OptionProps = {|
  badgeText?: string,
  children?: Node,
  isExternal?: boolean,
  /* the option with value and label */
  option: OptionObject,
  selected?: OptionObject | Array<OptionObject> | null,
  handleSelect?: ({|
    item: OptionObject,
    event: SyntheticFocusEvent<HTMLInputElement>,
  |}) => void,
  url?: string,
  // Private prop, not listed in props table
  index?: number,
|};

export default function DropdownItem({
  badgeText,
  children,
  handleSelect,
  index = 0,
  isExternal,
  option,
  selected,
  url,
}: OptionProps): Node {
  return (
    <DropdownContext.Consumer>
      {({ hoveredItem, setHoveredItem, setOptionRef }) => (
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
      )}
    </DropdownContext.Consumer>
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
};
