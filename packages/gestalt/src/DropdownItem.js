// @flow strict
import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import MenuOption, { type OptionObject } from './MenuOption.js';
import DropdownContext from './DropdownContextProvider.js';
import { CustomOnNavigationPropType, type CustomOnNavigation } from './contexts/OnNavigation.js';

type PublicProps = {|
  badgeText?: string,
  children?: Node,
  customOnNavigation?: CustomOnNavigation,
  handleSelect?: ({|
    event: SyntheticInputEvent<HTMLInputElement>,
    item: OptionObject,
  |}) => void,
  isExternal?: boolean,
  option: OptionObject,
  selected?: OptionObject | $ReadOnlyArray<OptionObject> | null,
  href?: string,
|};

type PrivateProps = {|
  index?: number,
|};

type Props = {|
  ...PublicProps,
  ...PrivateProps,
|};

export default function DropdownItem({
  badgeText,
  children,
  handleSelect,
  index = 0,
  isExternal,
  option,
  selected,
  href,
  customOnNavigation,
}: Props): Node {
  return (
    <DropdownContext.Consumer>
      {({ id, hoveredItem, setHoveredItem, setOptionRef }) => (
        <MenuOption
          key={`${option.value + index}`}
          badgeText={badgeText}
          customOnNavigation={customOnNavigation}
          handleSelect={handleSelect}
          hoveredItem={hoveredItem}
          id={id}
          index={index}
          isExternal={isExternal}
          option={option}
          role="menuitem"
          selected={selected}
          setHoveredItem={setHoveredItem}
          setOptionRef={setOptionRef}
          shouldTruncate
          textWeight="bold"
          href={href}
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
  customOnNavigation: CustomOnNavigationPropType,
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
      }),
    ),
  ]),
  handleSelect: PropTypes.func,
  href: PropTypes.string,
};
