// @flow strict
import { type Node } from 'react';
import { Box, Flex } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex
      gap={{ column: 0, row: 3 }}
      height="100%"
      width="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Box padding={0} smPadding={1} mdPadding={4} lgPadding={8} color="darkWash">
        <Box width={40} height={40} color="successBase" />
      </Box>
      <Box paddingX={0} smPaddingX={1} mdPaddingX={4} lgPaddingX={8} color="darkWash">
        <Box width={40} height={40} color="infoBase" />
      </Box>
      <Box paddingY={0} smPaddingY={1} mdPaddingY={4} lgPaddingY={8} color="darkWash">
        <Box width={40} height={40} color="warningBase" />
      </Box>
    </Flex>
  );
}
