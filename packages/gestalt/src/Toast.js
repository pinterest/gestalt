// @flow strict
import React, { type Element, type Node } from 'react';
import PropTypes from 'prop-types';
import Box from './Box.js';
import Mask from './Mask.js';
import Text from './Text.js';

type Props = {|
  button?: Node,
  color?: 'darkGray' | 'red' | 'white',
  text: string | Element<*>,
  thumbnail?: Node,
  thumbnailShape?: 'circle' | 'rectangle' | 'square',
|};

export default function Toast({
  button,
  color = 'darkGray',
  text,
  thumbnail,
  thumbnailShape = 'square',
}: Props): Node {
  return (
    <Box marginBottom={3} paddingX={4} maxWidth={360} width="100vw">
      <Box
        color={color}
        fit
        padding={6}
        rounding="pill"
        dangerouslySetInlineStyle={{
          __style: {
            boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <Box
          display="flex"
          marginLeft={-2}
          marginRight={-2}
          alignItems="center"
        >
          {thumbnail ? (
            <Box
              display="flex"
              flex="none"
              justifyContent="center"
              paddingX={2}
            >
              <Mask
                rounding={thumbnailShape === 'circle' ? 'circle' : 2}
                height={thumbnailShape === 'rectangle' ? 64 : 48}
                width={48}
              >
                {thumbnail}
              </Mask>
            </Box>
          ) : null}
          <Box
            display="flex"
            direction="column"
            flex="grow"
            justifyContent="center"
            paddingX={2}
          >
            <Text
              color={color === 'white' ? 'darkGray' : 'white'}
              align={!thumbnail && !button ? 'center' : 'left'}
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
  color: PropTypes.oneOf(['darkGray', 'red', 'white']),
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  thumbnail: PropTypes.node,
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  thumbnailShape: PropTypes.oneOf(['circle', 'rectangle', 'square']),
};
