import React from 'react';
import Box from '../../../src/Box/Box';
import Text from '../../../src/Text/Text';
import Checkerboard from './Checkerboard';
import Link from '../../../src/Link/Link';
import Icon from '../../../src/Icon/Icon';
import Checkbox from '../../../src/Checkbox/Checkbox';
import Column from '../../../src/Column/Column';
import Mask from '../../../src/Mask/Mask';
import Heading from '../../../src/Heading/Heading';

import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

export default ({ defaultCode, scope }) => (
  <LiveProvider
    code={defaultCode.trim()}
    scope={{
      Box,
      Link,
      Text,
      Icon,
      Checkbox,
      Column,
      Mask,
      Heading,
      ...scope,
    }}
  >
    <Box>
      <Box
        display="flex"
        direction="column"
        mdDirection="row"
        alignItems="stretch"
        marginLeft={-2}
        marginRight={-2}
      >
        <Box xs={{ column: 12 }} md={{ column: 6 }}>
          <Box paddingX={2}>
            <Box paddingY={2}>
              <Text size="sm" color="gray">
                Editor
              </Text>
            </Box>
            <Text>
              <LiveEditor />
            </Text>
          </Box>
        </Box>

        <Box xs={{ column: 12 }} md={{ column: 6 }}>
          <Box
            paddingX={2}
            display="flex"
            direction="column"
            alignItems="stretch"
            height="100%"
          >
            <Box paddingY={2}>
              <Text size="sm" color="gray">
                Preview
              </Text>
            </Box>

            <Box flex="grow" position="relative">
              <Box position="absolute" top bottom left right>
                <Checkerboard />
              </Box>
              <Box position="relative" padding={4}>
                <LivePreview />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box padding={2}>
        <Text color="watermelon" __dangerouslyIncreaseLineHeight>
          <LiveError />
        </Text>
      </Box>
    </Box>
  </LiveProvider>
);
