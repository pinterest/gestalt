// @flow strict
import { type Node } from 'react';
import { Box, Divider, Flex, Heading } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex direction="column" gap={{ column: 4, row: 0 }}>
        <Heading align="start" size="400">
          Start-aligned heading (default)
        </Heading>
        <Divider />
        <Heading align="end" size="400">
          End-aligned heading
        </Heading>
        <Divider />
        <Heading align="center" size="400">
          Center-aligned heading
        </Heading>
        <Divider />
        <Heading align="forceLeft" size="400">
          Forced-left-aligned heading
        </Heading>
        <Divider />
        <Heading align="forceRight" size="400">
          Forced-right-aligned heading
        </Heading>
      </Flex>
    </Box>
  );
}
