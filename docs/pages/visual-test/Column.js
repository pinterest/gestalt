// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Column, Flex, Text } from 'gestalt';

export default function Snapshot(): ReactNode {
  return (
    <Box color="default" display="inlineBlock" padding={1} width={400}>
      <Flex direction="column">
        <Column span={4}>
          <Box color="infoWeak" margin={1} padding={4}>
            <Text align="center">Column 1</Text>
          </Box>
        </Column>
        <Column span={4}>
          <Box color="infoWeak" margin={1} padding={4}>
            <Text align="center">Column 2</Text>
          </Box>
        </Column>
        <Column span={4}>
          <Box color="infoWeak" margin={1} padding={4}>
            <Text align="center">Column 3</Text>
          </Box>
        </Column>
      </Flex>
      <Flex>
        <Column span={4}>
          <Box color="successWeak" margin={1} padding={4}>
            <Text align="center">Column 1</Text>
          </Box>
        </Column>
        <Column span={4}>
          <Box color="successWeak" margin={1} padding={4}>
            <Text align="center">Column 2</Text>
          </Box>
        </Column>
        <Column span={4}>
          <Box color="successWeak" margin={1} padding={4}>
            <Text align="center">Column 3</Text>
          </Box>
        </Column>
      </Flex>
    </Box>
  );
}
