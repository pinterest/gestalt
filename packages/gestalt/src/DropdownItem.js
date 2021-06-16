// @flow strict
import { type Node } from 'react';
import PropTypes from 'prop-types';
import MenuOption, { type OptionObject } from './MenuOption.js';
import { DropdownContextConsumer } from './DropdownContext.js';

type PublicProps = {|
  badgeText?: string,
  children?: Node,
  onSelect: ({|
    event: SyntheticInputEvent<HTMLInputElement>,
    item: OptionObject,
  |}) => void,
  option: OptionObject,
  selected?: OptionObject | $ReadOnlyArray<OptionObject> | null,
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
        <MenuOption
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
        </MenuOption>
      )}
    </DropdownContextConsumer>
  );
}

// displayName is necessary for children identification in Dropdown
DropdownItem.displayName = 'DropdownItem';

DropdownItem.propTypes = {
  badgeText: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  // $FlowFixMe[incompatible-exact] Why Flow doesn't accept this as exact is beyond me
  option: (PropTypes.exact({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    subtext: PropTypes.string,
  }).isRequired: React$PropType$Primitive<OptionObject>),
  // $FlowFixMe[signature-verification-failure] Beware, this thing is a mess to properly type
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
};
