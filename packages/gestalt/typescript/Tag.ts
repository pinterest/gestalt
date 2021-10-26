import type { Node } from "react";
import classnames from "classnames";
import Box from "./Box";
import Flex from "./Flex";
import Text from "./Text";
import Icon from "./Icon";
import { useColorScheme } from "./contexts/ColorScheme";
import useFocusVisible from "./useFocusVisible";
import focusStyles from "./Focus.css";
import touchableStyles from "./Touchable.css";
import typographyStyles from "./Typography.css";
import styles from "./Tag.css";
type Props = (
  | {
      disabled: true;
      onRemove?: (arg0: { event: React.MouseEvent<HTMLButtonElement> }) => void;
      removeIconAccessibilityLabel?: string;
    }
  | {
      disabled?: boolean;
      onRemove: (arg0: { event: React.MouseEvent<HTMLButtonElement> }) => void;
      removeIconAccessibilityLabel: string;
    }
) & {
  text: string;
  errorMessage?: string;
};
/**
 * https://gestalt.pinterest.systems/Tag
 */

export default function Tag(props: Props): Node {
  const {
    disabled = false,
    errorMessage,
    onRemove = null,
    removeIconAccessibilityLabel = "",
    text,
  } = props;
  const { colorGray200 } = useColorScheme();
  const bgColor = errorMessage ? "red" : "lightGray";
  let fgColor = "darkGray";

  if (errorMessage) {
    fgColor = "white";
  } else if (disabled) {
    fgColor = "gray";
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
  const borderStyle =
    disabled && !errorMessage
      ? {
          __style: {
            border: `solid 1px ${colorGray200}`,
          },
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
            <button
              className={removeIconClasses}
              onClick={onRemove}
              type="button"
            >
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