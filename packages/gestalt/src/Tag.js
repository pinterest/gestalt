// @flow strict
import { type Node } from 'react';
import classnames from 'classnames';
import Box from './Box.js';
import Flex from './Flex.js';
import Text from './Text.js';
import Icon from './Icon.js';
import { useColorScheme } from './contexts/ColorSchemeProvider.js';
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
        disabled?: boolean,
        onRemove: ({|
          event: SyntheticMouseEvent<HTMLButtonElement>,
        |}) => void,
        removeIconAccessibilityLabel: string,
      |},
|};

/**
 * [Tags](https://gestalt.pinterest.systems/tag) are objects that hold text and have a delete icon to remove them. They can appear within [TextFields](https://gestalt.pinterest.systems/textfield#tagsExample), [TextAreas](https://gestalt.pinterest.systems/textarea#tagsExample), [ComboBox](https://gestalt.pinterest.systems/combobox#Tags) or as standalone components.
 *
 * ![Tag light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Tag.spec.mjs-snapshots/Tag-chromium-darwin.png)
 * ![Tag dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Tag-dark.spec.mjs-snapshots/Tag-dark-chromium-darwin.png)
 */
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
  let fgColor = 'default';
  if (errorMessage) {
    fgColor = 'inverse';
  } else if (disabled) {
    fgColor = 'subtle';
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
        <div title={text}>
          <Text color={fgColor} inline lineClamp={1} size="200">
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
