// @flow
import React from 'react';
import * as gestalt from 'gestalt';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import Card from './Card.js';
import Checkerboard from './Checkerboard.js';

type Props = {|
  defaultCode: string,
  description?: string,
  name: string,
  direction?: 'row' | 'column',
|};

const { Box, Text, Column } = gestalt;

function Example({
  defaultCode,
  description,
  name,
  direction = 'column',
}: Props) {
  return (
    <Card
      name={name}
      description={description}
      stacked={direction === 'column'}
    >
      <LiveProvider code={defaultCode.trim()} scope={gestalt}>
        <Box
          display="flex"
          direction={direction}
          marginLeft={-2}
          marginRight={-2}
        >
          <Column span={direction === 'column' ? 12 : 6}>
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
          </Column>

          <Column span={direction === 'column' ? 12 : 6}>
            <Box paddingX={2}>
              <Box paddingY={2}>
                <Text size="sm" color="gray">
                  Editor
                </Text>
              </Box>
              <LiveEditor />
            </Box>
          </Column>
        </Box>

        <Box padding={2}>
          <Text color="watermelon" leading="tall">
            <LiveError />
          </Text>
        </Box>
      </LiveProvider>
    </Card>
  );
}

export default Example;
