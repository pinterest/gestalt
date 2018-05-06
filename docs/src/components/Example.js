// @flow
import React from 'react';
import * as gestalt from 'gestalt';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import Card from './Card';
import Checkerboard from './Checkerboard';

type Props = {|
  defaultCode: string,
  description: string,
  name: string,
  scope: Object,
|};

const { Box, Text } = gestalt;

export default ({ defaultCode, description = '', name, scope }: Props) => (
  <Card name={name} description={description} stacked>
    <LiveProvider
      code={defaultCode.trim()}
      scope={{
        ...gestalt,
        ...scope,
      }}
    >
      <Box marginLeft={-2} marginRight={-2}>
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

        <Box paddingX={2}>
          <Box paddingY={2}>
            <Text size="sm" color="gray">
              Editor
            </Text>
          </Box>
          <LiveEditor />
        </Box>
      </Box>

      <Box padding={2}>
        <Text color="watermelon" leading="tall">
          <LiveError />
        </Text>
      </Box>
    </LiveProvider>
  </Card>
);
