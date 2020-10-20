// @flow strict
import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Box from './Box.js';
import Text from './Text.js';
import styles from './Touchable.css';
import getRoundingClassName from './getRoundingClassName.js';
import Icon from './Icon.js';
import focusStyles from './Focus.css';
import useFocusVisible from './useFocusVisible.js';

type OptionObject = {|
  label: string,
  value: string,
|};

type OptionProps = {|
  index: number,
  option: OptionObject,
  selected?: OptionObject | null,
  handleSelect: ({|
    item: OptionObject,
    event: SyntheticFocusEvent<HTMLInputElement>,
  |}) => void,
  hoveredItem: ?number,
  setHoveredItem: (number) => void,
  setOptionRef: (?HTMLElement) => void,
|};

export default function TypeaheadOption({
  index,
  option,
  selected,
  handleSelect,
  hoveredItem,
  setHoveredItem,
  setOptionRef,
}: OptionProps): Node {
  // Determine if the option is the current selected item
  const isSelectedItem = JSON.stringify(option) === JSON.stringify(selected);

  const handleOnTap = (event) => {
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

  return (
    <div
      ref={(ref) => {
        if (index === hoveredItem) setOptionRef(ref);
      }}
      className={className}
      key={option.value}
      onClick={handleOnTap}
      onMouseDown={(event) => {
        event.preventDefault();
      }}
      onKeyPress={(event) => {
        event.preventDefault();
      }}
      rounding={2}
      onMouseEnter={() => setHoveredItem(index)}
      role="option"
      aria-selected={isSelectedItem}
      tabIndex="-1"
    >
      <Box
        margin={1}
        padding={2}
        color={optionStateColor}
        rounding={2}
        display="flex"
      >
        <Box flex="grow">
          <Text color="darkGray">{`${option?.label}`}</Text>
        </Box>
        {isSelectedItem && (
          <Box
            display="flex"
            color="transparent"
            justifyContent="center"
            alignItems="center"
          >
            <Icon
              accessibilityLabel="selected-icon"
              color="darkGray"
              icon="check"
              size={12}
            />
          </Box>
        )}
      </Box>
    </div>
  );
}

TypeaheadOption.displayName = 'TypeaheadOption';

TypeaheadOption.propTypes = {
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
