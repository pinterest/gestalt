// @flow strict
import type { Element, Node } from 'react';
import PropTypes from 'prop-types';
import Box from './Box.js';
import Mask from './Mask.js';
import Text from './Text.js';

type Props = {|
  button?: Node,
  color?: 'white' | 'red',
  text: string | Element<*>,
  thumbnail?: Node,
  thumbnailShape?: 'circle' | 'rectangle' | 'square',
|};

export default function Toast({
  button,
  color = 'white',
  text,
  thumbnail,
  thumbnailShape = 'square',
}: Props): Node {
  return (
    <Box marginBottom={3} paddingX={4} maxWidth={360} width="100vw">
      <Box color={color} fit padding={6} rounding="pill" borderStyle="shadow">
        <Box display="flex" marginStart={-2} marginEnd={-2} alignItems="center">
          {thumbnail ? (
            <Box display="flex" flex="none" justifyContent="center" paddingX={2}>
              <Mask
                rounding={thumbnailShape === 'circle' ? 'circle' : 2}
                height={thumbnailShape === 'rectangle' ? 64 : 48}
                width={48}
              >
                {thumbnail}
              </Mask>
            </Box>
          ) : null}
          <Box display="flex" direction="column" flex="grow" justifyContent="center" paddingX={2}>
            <Text
              color={color === 'red' ? 'white' : undefined}
              align={!thumbnail && !button ? 'center' : 'start'}
            >
              {text}
            </Text>
          </Box>
          {button ? (
            <Box flex="none" paddingX={2}>
              {button}
            </Box>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
}

Toast.propTypes = {
  button: PropTypes.node,
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  color: PropTypes.oneOf(['white', 'red']),
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  thumbnail: PropTypes.node,
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  thumbnailShape: PropTypes.oneOf(['circle', 'rectangle', 'square']),
};
