// @flow strict
import type { Element, Node } from 'react';
import Box from './Box.js';
import Flex from './Flex.js';
import Mask from './Mask.js';
import Text from './Text.js';
import styles from './Toast.css';
import { useColorScheme } from './contexts/ColorScheme.js';

type Props = {|
  /**
   * Add an optional button for user interaction. Generally not recommended given the ephemeral nature of Toasts.
   */
  button?: Node,
  /**
   * Use string for guide toasts (one line of text) and React.Node for confirmation toasts (complex text, potentially containing a Link). Do not specify a Text color within this property, as the color is automatically determined based on the `variant`.
   */
  text: string | Element<*>,
  /**
   * An optional thumbnail image to displayed next to the text.
   */
  thumbnail?: Node,
  /**
   * The masked shape of the thumbnail.
   */
  thumbnailShape?: 'circle' | 'rectangle' | 'square',
  /**
   * Use the `'error'` variant to indicate an error message. Generally not recommended given the ephemeral nature of Toasts.
   */
  variant?: 'default' | 'error',
|};

/**
 * [Toasts](https://gestalt.pinterest.systems/toast) can educate people on the content of the screen, provide confirmation when people complete an action, or simply communicate a short message.
 *
 * Toast is purely visual. In order to properly handle the showing and dismissing of Toasts, as well as any animations, you will need to implement a Toast manager.
 */
export default function Toast({
  button,
  text,
  thumbnail,
  thumbnailShape = 'square',
  variant = 'default',
}: Props): Node {
  const { name: colorSchemeName } = useColorScheme();
  const isDarkMode = colorSchemeName === 'darkMode';
  const isErrorVariant = variant === 'error';

  let containerColor = isDarkMode ? 'white' : 'darkGray';
  let textColor = isDarkMode ? 'darkGray' : 'white';
  let textElement = text;

  // If `text` is a Node, we need to override any text colors within to ensure they all match
  if (typeof text !== 'string') {
    let textColorOverrideStyles = isDarkMode
      ? styles.textColorOverrideDarkGray
      : styles.textColorOverrideWhite;
    if (isErrorVariant) {
      textColorOverrideStyles = styles.textColorOverrideWhite;
    }

    textElement = <span className={textColorOverrideStyles}>{text}</span>;
  }

  // Error variant does not currently support dark mode
  if (isErrorVariant) {
    containerColor = 'red';
    textColor = 'white';
  }

  return (
    <Box marginBottom={3} maxWidth={360} paddingX={4} role="status" width="100vw">
      <Box borderStyle="shadow" color={containerColor} fit padding={6} rounding="pill">
        <Flex alignItems="center" gap={4}>
          {thumbnail ? (
            <Flex flex="none" justifyContent="center">
              <Mask
                height={thumbnailShape === 'rectangle' ? 64 : 48}
                rounding={thumbnailShape === 'circle' ? 'circle' : 2}
                width={48}
              >
                {thumbnail}
              </Mask>
            </Flex>
          ) : null}

          <Flex direction="column" flex="grow" justifyContent="center">
            <Text align={!thumbnail && !button ? 'center' : 'start'} color={textColor}>
              {textElement}
            </Text>
          </Flex>

          {button ? <Flex.Item flex="none">{button}</Flex.Item> : null}
        </Flex>
      </Box>
    </Box>
  );
}
