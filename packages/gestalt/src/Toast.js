// @flow strict
import type { Element, Node } from 'react';
import PropTypes from 'prop-types';
import Box from './Box.js';
import Flex from './Flex.js';
import Mask from './Mask.js';
import Text from './Text.js';
import styles from './Toast.css';
import { useColorScheme } from './contexts/ColorScheme.js';

type Props = {|
  button?: Node,
  text: string | Element<*>,
  thumbnail?: Node,
  thumbnailShape?: 'circle' | 'rectangle' | 'square',
  variant?: 'default' | 'error',
  // Experimental prop to replace the default color with darkGray
  _dangerouslyUseDarkGray?: boolean,
|};

/**
 * https://gestalt.pinterest.systems/Toast
 */
export default function Toast({
  button,
  text,
  thumbnail,
  thumbnailShape = 'square',
  variant = 'default',
  _dangerouslyUseDarkGray,
}: Props): Node {
  const { name: colorSchemeName } = useColorScheme();
  const isDarkMode = colorSchemeName === 'darkMode';
  const isErrorVariant = variant === 'error';

  let containerColor = _dangerouslyUseDarkGray ? 'darkGray' : 'white';
  let textColor = _dangerouslyUseDarkGray ? 'white' : 'darkGray';

  if (isErrorVariant) {
    // Error variant does not currently support dark mode
    containerColor = 'red';
    textColor = 'white';
  } else if (isDarkMode) {
    containerColor = 'white';
    textColor = 'darkGray';
  }

  let textColorOverrideStyles = isDarkMode
    ? styles.textColorOverrideDarkGray
    : styles.textColorOverrideWhite;
  if (isErrorVariant) {
    textColorOverrideStyles = styles.textColorOverrideWhite;
  }

  const textElement =
    _dangerouslyUseDarkGray && typeof text !== 'string' ? (
      <span className={textColorOverrideStyles}>{text}</span>
    ) : (
      text
    );

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

Toast.propTypes = {
  button: PropTypes.node,
  text: (PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired: React$PropType$Primitive<string | Element<*>>),
  thumbnail: PropTypes.node,
  thumbnailShape: (PropTypes.oneOf(['circle', 'rectangle', 'square']): React$PropType$Primitive<
    'circle' | 'rectangle' | 'square',
  >),
  variant: (PropTypes.oneOf(['default', 'error']): React$PropType$Primitive<'default' | 'error'>),
  _dangerouslyUseDarkGray: PropTypes.bool,
};
