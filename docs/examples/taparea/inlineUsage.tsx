import { ReactNode } from 'react';
import { Box, Flex, TapArea, Text } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Box color="warningBase" height={250} maxWidth={500} padding={3}>
        <Flex direction="column" gap={{ column: 6, row: 0 }}>
          <Flex.Item>
            <Text color="inverse" inline>
              Other content
            </Text>
            <Box borderStyle="sm" column={6} margin={3}>
              <TapArea>
                <Box color="secondary" height="100%">
                  <Text align="center">Default behavior (block)</Text>
                </Box>
              </TapArea>
            </Box>
          </Flex.Item>

          <Flex.Item>
            <Text color="inverse" inline>
              Other content
            </Text>
            <Box borderStyle="sm" column={6} display="inlineBlock" margin={3}>
              <TapArea>
                <Box color="secondary" height="100%">
                  <Text align="center">Inline behavior</Text>
                </Box>
              </TapArea>
            </Box>
          </Flex.Item>
        </Flex>
      </Box>
    </Box>
  );
}
