// @flow strict
import type { Node } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Box from './Box.js';
import Flex from './Flex.js';
import Text from './Text.js';
import Icon from './Icon.js';
import { useColorScheme } from './contexts/ColorScheme.js';
import useFocusVisible from './useFocusVisible.js';
import focusStyles from './Focus.css';
import touchableStyles from './Touchable.css';
import typographyStyles from './Typography.css';
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
  const { colorGray200 } = useColorScheme();

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
    },
  );

  const borderStyle =
    disabled && !errorMessage
      ? {
          __style: { border: `solid 1px ${colorGray200}` },
        }
      : undefined;

  return (
    <Box
      aria-disabled={disabled}
      color={bgColor}
      dangerouslySetInlineStyle={borderStyle}
      display="inlineBlock"
      height={32}
      maxWidth={300}
      rounding={2}
    >
      <Flex alignItems="center" height="100%">
        <Box marginStart={errorMessage ? 2 : 0} marginEnd={2}>
          {errorMessage && (
            <Icon
              accessibilityLabel={errorMessage}
              color={fgColor}
              icon="workflow-status-problem"
              size={12}
            />
          )}
        </Box>
        <div className={typographyStyles.truncate} title={text}>
          <Text color={fgColor} inline size="md">
            {text}
          </Text>
        </div>
        <Box marginStart={disabled ? 2 : 1}>
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
        </Box>
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
