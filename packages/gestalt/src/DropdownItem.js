// @flow strict
import type { Node } from 'react';
import PropTypes from 'prop-types';
import MenuOption, { type OptionObject } from './MenuOption.js';
import { DropdownContextConsumer } from './DropdownContext.js';
import { type AbstractEventHandler } from './AbstractEventHandler.js';

type PublicProps = {|
  badgeText?: string,
  children?: Node,
  handleSelect?: ({|
    event: SyntheticInputEvent<HTMLInputElement>,
    item: OptionObject,
  |}) => void,
  isExternal?: boolean,
  onClick?: AbstractEventHandler<
    SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement>,
    {| disableOnNavigation: () => void |},
  >,
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

/**
 * https://gestalt.pinterest.systems/Dropdown
 */
export default function DropdownItem({
  badgeText,
  children,
  handleSelect,
  index = 0,
  isExternal,
  onClick,
  option,
  selected,
  href,
}: Props): Node {
  return (
    <DropdownContextConsumer>
      {({ id, hoveredItem, setHoveredItem, setOptionRef }) => (
        <MenuOption
          key={`${option.value + index}`}
          badgeText={badgeText}
          handleSelect={handleSelect}
          hoveredItem={hoveredItem}
          href={href}
          id={id}
          index={index}
          isExternal={isExternal}
          onClick={onClick}
          option={option}
          role="menuitem"
          selected={selected}
          setHoveredItem={setHoveredItem}
          setOptionRef={setOptionRef}
          shouldTruncate
          textWeight="bold"
        >
          {children}
        </MenuOption>
      )}
    </DropdownContextConsumer>
  );
}

// displayName is necessary for children identification in Dropdown
DropdownItem.displayName = 'DropdownItem';

DropdownItem.propTypes = {
  badgeText: PropTypes.string,
  isExternal: PropTypes.bool,
  onClick: PropTypes.func,
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
