// @flow strict
import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Badge from './Badge.js';
import Box from './Box.js';
import Flex from './Flex.js';
import Link from './Link.js';
import Text from './Text.js';
import styles from './Touchable.css';
import getRoundingClassName from './getRoundingClassName.js';
import Icon from './Icon.js';
import focusStyles from './Focus.css';
import useFocusVisible from './useFocusVisible.js';

type OptionObject = {|
  label: string,
  value: string,
  subtext?: string,
|};

type OptionProps = {|
  badgeText?: string,
  children?: Node,
  index: number,
  option: OptionObject,
  selected?: OptionObject | Array<OptionObject> | null,
  handleSelect?: ({|
    item: OptionObject,
    event: SyntheticFocusEvent<HTMLInputElement>,
  |}) => void,
  hoveredItem: ?number,
  isExternal?: boolean,
  role?: 'option' | 'menuitem',
  setHoveredItem: (number) => void,
  setOptionRef: (?HTMLElement) => void,
  shouldTruncate?: boolean,
  textWeight?: 'bold' | 'normal',
  url?: string,
|};

export default function MenuOption({
  badgeText,
  children,
  handleSelect,
  hoveredItem,
  index,
  isExternal,
  option,
  role,
  selected,
  setHoveredItem,
  setOptionRef,
  shouldTruncate = false,
  textWeight = 'normal',
  url,
}: OptionProps): Node {
  let foundAMatch = [];
  if (selected instanceof Array)
    foundAMatch = selected.filter((item) => item.value === option.value);

  // Determine if the option is a current selected item
  const isSelectedItem =
    foundAMatch.length > 0 ||
    JSON.stringify(option) === JSON.stringify(selected);

  const handleOnTap = (event) => {
    if (!url && !children) {
      event.preventDefault();
    }
    if (handleSelect) handleSelect({ event, item: option });
  };

  const { isFocusVisible } = useFocusVisible();

  const className = classnames(
    getRoundingClassName(2),
    focusStyles.hideOutline,
    {
      [focusStyles.accessibilityOutline]: isFocusVisible,
      [styles.fullWidth]: true,
      [styles.pointer]: true,
    }
  );

  // Default option color
  let optionStateColor = 'transparent';

  // Set color on item hover
  if (index === hoveredItem) optionStateColor = 'lightGray';

  const menuOptionContents = (
    <Flex>
      <Flex flex="grow" direction="column">
        <Flex alignItems="center">
          {children || (
            <>
              <Text
                truncate={shouldTruncate}
                weight={textWeight}
                color="darkGray"
                inline
              >
                {option?.label}
              </Text>
              {badgeText && (
                <Box marginStart={2} marginTop={1}>
                  <Badge text={badgeText} />
                </Box>
              )}
            </>
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
          <Icon
            accessibilityLabel="Selected item"
            color="darkGray"
            icon="check"
            size={12}
          />
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
          <Icon
            accessibilityLabel="external option"
            color="darkGray"
            icon="arrow-up-right"
            size={12}
          />
        </Box>
      )}
    </Flex>
  );

  return (
    <div
      ref={(ref) => {
        if (index === hoveredItem) setOptionRef(ref);
      }}
      className={className}
      key={option.value}
      id={index}
      onClick={handleOnTap}
      onMouseDown={(event) => {
        event.preventDefault();
      }}
      onKeyPress={(event) => {
        event.preventDefault();
      }}
      rounding={2}
      onMouseEnter={() => setHoveredItem(index)}
      role={role}
      aria-selected={isSelectedItem}
      tabIndex={index === hoveredItem ? '0' : '-1'}
    >
      <Box
        padding={2}
        color={optionStateColor}
        rounding={2}
        display="flex"
        direction="column"
      >
        {url ? (
          <Link hoverStyle="none" href={url}>
            {menuOptionContents}
          </Link>
        ) : (
          menuOptionContents
        )}
      </Box>
    </div>
  );
}

MenuOption.displayName = 'MenuOption';

MenuOption.propTypes = {
  index: PropTypes.number.isRequired,
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  option: PropTypes.exact({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    subtext: PropTypes.string,
  }).isRequired,
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
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
      })
    ),
  ]),
  handleSelect: PropTypes.func,
  hoveredItem: PropTypes.number,
  setHoveredItem: PropTypes.func,
  setOptionRef: PropTypes.func,
};
