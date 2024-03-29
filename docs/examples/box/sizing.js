// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Flex, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex alignItems="center" height="100%">
      <Box column={12}>
        <Box
          borderStyle="lg"
          color="warningBase"
          maxHeight={100}
          minHeight={25}
          overflow="hidden"
          padding={2}
          width="25%"
        >
          <Text color="light">
            Add or remove text in the editor to see the min and max heights take affect.
          </Text>
        </Box>
        <Box borderStyle="lg" color="successBase" height={100} padding={2} width="50%">
          <Text color="light">
            Width and Height can be specified with numbers for &quot;px&quot; values or percentages
          </Text>
        </Box>
        <Box
          borderStyle="lg"
          color="infoBase"
          maxWidth={500}
          minWidth={100}
          padding={2}
          width="75%"
        >
          <Text color="light">
            Change the screen width to see the min and max widths take affect{' '}
          </Text>
        </Box>
        <Box borderStyle="lg" color="errorBase" fit padding={2}>
          <Text color="light">&quot;fit&quot; sets width to 100% </Text>
        </Box>
      </Box>
    </Flex>
  );
}
