// @flow strict
import { forwardRef, Fragment, type Node } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Badge from './Badge.js';
import Box from './Box.js';
import Flex from './Flex.js';
import Link from './Link.js';
import Text, { type FontWeight } from './Text.js';
import styles from './Touchable.css';
import getRoundingClassName from './getRoundingClassName.js';
import Icon from './Icon.js';
import focusStyles from './Focus.css';
import useFocusVisible from './useFocusVisible.js';
import { type AbstractEventHandler } from './AbstractEventHandler.js';

export type OptionObject = {|
  label: string,
  value: string,
  subtext?: string,
|};

type Props = {|
  badgeText?: string,
  children?: Node,
  index: number,
  onClick?: AbstractEventHandler<
    SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement>,
    {| disableOnNavigation: () => void |},
  >,
  option: OptionObject,
  selected?: OptionObject | $ReadOnlyArray<OptionObject> | null,
  handleSelect?: ({|
    item: OptionObject,
    event: SyntheticInputEvent<HTMLInputElement>,
  |}) => void,
  hoveredItemIndex: ?number,
  id: string,
  isExternal?: boolean,
  role?: 'option' | 'menuitem',
  setHoveredItemIndex: (number) => void,
  shouldTruncate?: boolean,
  textWeight?: FontWeight,
  href?: string,
|};

const MenuOptionWithForwardRef: React$AbstractComponent<Props, ?HTMLElement> = forwardRef<
  Props,
  ?HTMLElement,
>(function MenuOption(props, ref): Node {
  const {
    badgeText, // eslint-disable-line react/prop-types
    children, // eslint-disable-line react/prop-types
    handleSelect,
    hoveredItemIndex,
    href,
    id,
    index,
    isExternal, // eslint-disable-line react/prop-types
    onClick,
    option,
    role, // eslint-disable-line react/prop-types
    selected,
    setHoveredItemIndex,
    shouldTruncate = false, // eslint-disable-line react/prop-types
    textWeight = 'normal', // eslint-disable-line react/prop-types
  } = props;

  const matches = (Array.isArray(selected) ? selected : []).filter(
    ({ value }) => value === option.value,
  );
  // Determine if the option is a current selected item
  const isSelectedItem = matches.length > 0 || JSON.stringify(option) === JSON.stringify(selected);

  const handleOnTap = (event) => {
    if (!href && !children) {
      event.preventDefault();
    }
    if (handleSelect) handleSelect({ event, item: option });
  };

  const { isFocusVisible } = useFocusVisible();

  const className = classnames(getRoundingClassName(2), focusStyles.hideOutline, {
    [focusStyles.accessibilityOutline]: isFocusVisible,
    [focusStyles.accessibilityOutlineFocusWithin]: isFocusVisible,
    [styles.fullWidth]: true,
    [styles.pointer]: true,
  });

  // Set color on item hover
  const optionStateColor = index === hoveredItemIndex ? 'lightGray' : 'transparent';

  const menuOptionContents = (
    <Flex>
      <Flex flex="grow" direction="column">
        <Flex alignItems="center">
          {children || (
            <Fragment>
              <Text truncate={shouldTruncate} weight={textWeight} color="darkGray" inline>
                {option?.label}
              </Text>
              {/* Adds a pause for screen reader users between the text content */}
              {badgeText && (
                <Box marginStart={2} marginTop={1}>
                  <Box display="visuallyHidden">{`, `}</Box>
                  <Badge text={badgeText} />
                </Box>
              )}
            </Fragment>
          )}
        </Flex>
        {option.subtext && (
          <Box marginTop={1}>
            <Text size="md" color="gray">
              {option.subtext}
            </Text>
          </Box>
        )}
      </Flex>
      <Box
        display={!isExternal ? 'flex' : 'none'}
        color="transparent"
        justifyContent="center"
        alignItems="center"
        marginStart={2}
      >
        {isSelectedItem && !isExternal ? (
          <Icon accessibilityLabel="Selected item" color="darkGray" icon="check" size={12} />
        ) : (
          <Box width={12} />
        )}
      </Box>
      {isExternal && (
        <Box
          display="flex"
          color="transparent"
          justifyContent="center"
          alignItems="center"
          marginStart={2}
        >
          <Icon accessibilityLabel=", External" color="darkGray" icon="arrow-up-right" size={12} />
        </Box>
      )}
    </Flex>
  );

  return (
    <div
      aria-selected={isSelectedItem}
      className={className}
      id={`${id}-item-${index}`}
      onClick={handleOnTap}
      onKeyPress={(event) => {
        event.preventDefault();
      }}
      onMouseDown={(event) => {
        event.preventDefault();
      }}
      onMouseEnter={() => setHoveredItemIndex(index)}
      ref={index === hoveredItemIndex ? ref : null}
      role={role}
      rounding={2}
      tabIndex={-1}
    >
      <Box padding={2} color={optionStateColor} rounding={2} display="flex" direction="column">
        {href ? (
          <Link
            hoverStyle="none"
            href={href}
            onClick={onClick}
            target={isExternal ? 'blank' : 'self'}
          >
            {menuOptionContents}
          </Link>
        ) : (
          menuOptionContents
        )}
      </Box>
    </div>
  );
});

MenuOptionWithForwardRef.displayName = 'MenuOption';

export default MenuOptionWithForwardRef;

MenuOptionWithForwardRef.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  option: PropTypes.exact({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    subtext: PropTypes.string,
  }).isRequired,
  selected: PropTypes.oneOfType([
    PropTypes.exact({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      subtext: PropTypes.string,
    }),
    PropTypes.arrayOf(
      PropTypes.exact({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        subtext: PropTypes.string,
      }),
    ),
  ]),
  handleSelect: PropTypes.func,
  hoveredItemIndex: PropTypes.number,
  setHoveredItemIndex: PropTypes.func,
  href: PropTypes.string,
};
