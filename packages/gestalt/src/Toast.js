// @flow strict
import type { Element, Node } from 'react';
import PropTypes from 'prop-types';
import Box from './Box.js';
import Flex from './Flex.js';
import Mask from './Mask.js';
import Text from './Text.js';

type Props = {|
  button?: Node,
  text: string | Element<*>,
  thumbnail?: Node,
  thumbnailShape?: 'circle' | 'rectangle' | 'square',
  variant?: 'default' | 'error',
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
}: Props): Node {
  const isErrorVariant = variant === 'error';
  const containerColor = isErrorVariant ? 'red' : 'white';
  const textColor = isErrorVariant ? 'white' : undefined;

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
              {text}
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
};
