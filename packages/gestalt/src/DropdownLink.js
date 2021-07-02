// @flow strict
import { type Node } from 'react';
import PropTypes from 'prop-types';
import OptionItem, { type OptionItemType } from './OptionItem.js';
import { DropdownContextConsumer } from './DropdownContext.js';
import { type AbstractEventHandler } from './AbstractEventHandler.js';

type PublicProps = {|
  badgeText?: string,
  children?: Node,
  href: string,
  isExternal?: boolean,
  onClick?: AbstractEventHandler<
    SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement>,
    {| disableOnNavigation: () => void |},
  >,
  option: OptionItemType,
|};

type PrivateProps = {|
  index?: number,
|};

type Props = {|
  ...PublicProps,
  ...PrivateProps,
|};

export default function DropdownLink({
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
        <OptionItem
          badgeText={badgeText}
          hoveredItemIndex={hoveredItem}
          href={href}
          id={id}
          index={index}
          isExternal={isExternal}
          key={`${option.value + index}`}
          onClick={onClick}
          option={option}
          role="menuitem"
          setHoveredItemIndex={setHoveredItem}
          ref={setOptionRef}
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
DropdownLink.displayName = 'DropdownLink';

DropdownLink.propTypes = {
  badgeText: PropTypes.string,
  href: PropTypes.string.isRequired,
  isExternal: PropTypes.bool,
  onClick: PropTypes.func,
  // $FlowFixMe[incompatible-exact] Why Flow doesn't accept this as exact is beyond me
  option: (PropTypes.exact({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    subtext: PropTypes.string,
  }).isRequired: React$PropType$Primitive<OptionItemType>),
};
