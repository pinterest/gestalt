// @flow strict
import { type Node } from 'react';
import PropTypes from 'prop-types';
import MenuOption, { type OptionObject } from './MenuOption.js';
import { DropdownContextConsumer } from './DropdownContext.js';
import { type AbstractEventHandler } from './AbstractEventHandler.js';

type PublicProps = {|
  badgeText?: string,
  children?: Node,
  href?: string,
  isExternal?: boolean,
  onClick?: AbstractEventHandler<
    SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement>,
    {| disableOnNavigation: () => void |},
  >,
  option: OptionObject,
|};

type PrivateProps = {|
  index?: number,
|};

type Props = {|
  ...PublicProps,
  ...PrivateProps,
|};

export default function DropdownNavItem({
  badgeText,
  children,
  href,
  index = 0,
  isExternal,
  onClick,
  option,
}: Props): Node {
  return (
    <DropdownContextConsumer>
      {({ id, hoveredItem, setHoveredItem, setOptionRef }) => (
        <MenuOption
          badgeText={badgeText}
          hoveredItem={hoveredItem}
          href={href}
          id={id}
          index={index}
          isExternal={isExternal}
          key={`${option.value + index}`}
          onClick={onClick}
          option={option}
          role="menuitem"
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
DropdownNavItem.displayName = 'DropdownNavItem';

DropdownNavItem.propTypes = {
  badgeText: PropTypes.string,
  href: PropTypes.string,
  isExternal: PropTypes.bool,
  onClick: PropTypes.func,
  // $FlowFixMe[incompatible-exact] Why Flow doesn't accept this as exact is beyond me
  option: (PropTypes.exact({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    subtext: PropTypes.string,
  }).isRequired: React$PropType$Primitive<OptionObject>),
};
