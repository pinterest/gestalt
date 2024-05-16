import {ReactNode} from 'react';
import { Box, Divider, Flex, Heading } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
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
