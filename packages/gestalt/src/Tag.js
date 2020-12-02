// @flow strict
import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Box from './Box.js';
import Flex from './Flex.js';
import Text from './Text.js';
import Icon from './Icon.js';
import useFocusVisible from './useFocusVisible.js';
import focusStyles from './Focus.css';
import touchableStyles from './Touchable.css';
import styles from './Tag.css';

type Props = {|
  text: string,
  errorMessage?: string,
  ...
    | {|
        disabled: true,
        onRemove?: ({|
          event: SyntheticMouseEvent<HTMLButtonElement>,
        |}) => void,
        removeIconAccessibilityLabel?: string,
      |}
    | {|
        disabled?: false,
        onRemove: ({|
          event: SyntheticMouseEvent<HTMLButtonElement>,
        |}) => void,
        removeIconAccessibilityLabel: string,
      |},
|};

export default function Tag(props: Props): Node {
  const {
    disabled = false,
    errorMessage,
    onRemove = null,
    removeIconAccessibilityLabel = '',
    text,
  } = props;

  const bgColor = errorMessage ? 'red' : 'lightGray';
  let fgColor = 'darkGray';
  if (errorMessage) {
    fgColor = 'white';
  } else if (disabled) {
    fgColor = 'gray';
  }

  const { isFocusVisible } = useFocusVisible();

  const removeIconClasses = classnames(
    styles.button,
    styles[bgColor],
    focusStyles.hideOutline,
    touchableStyles.tapTransition,
    {
      [focusStyles.accessibilityOutline]: isFocusVisible,
    }
  );

  return (
    <Box
      borderStyle={disabled && !errorMessage ? 'sm' : 'none'}
      color={bgColor}
      display="inlineBlock"
      rounding={2}
    >
      <Flex alignItems="center">
        {errorMessage && (
          <Box marginStart={2}>
            <Icon
              accessibilityLabel={errorMessage}
              color={fgColor}
              icon="workflow-status-problem"
            />
          </Box>
        )}
        <Box
          marginStart={2}
          marginEnd={disabled ? 2 : 1}
          paddingY={disabled ? 2 : 0}
        >
          <Text color={fgColor} size="md">
            {text}
          </Text>
        </Box>
        {!disabled && (
          <button className={removeIconClasses} onClick={onRemove} type="button">
            <Icon
              accessibilityLabel={removeIconAccessibilityLabel}
              color={fgColor}
              icon="cancel"
              size={8}
            />
          </button>
        )}
      </Flex>
    </Box>
  );
}

Tag.propTypes = {
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
  onRemove: PropTypes.func,
  removeIconAccessibilityLabel: PropTypes.string,
};
