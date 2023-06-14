// @flow strict
import { type Node } from 'react';
import { Box, Flex, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex height="100%" alignItems="center">
      <Box column={12}>
        <Box
          width="25%"
          minHeight={25}
          maxHeight={100}
          overflow="hidden"
          padding={2}
          borderStyle="lg"
          color="warningBase"
        >
          <Text color="light">
            Add or remove text in the editor to see the min and max heights take affect.
          </Text>
        </Box>
        <Box width="50%" height={100} padding={2} borderStyle="lg" color="successBase">
          <Text color="light">
            Width and Height can be specified with numbers for &quot;px&quot; values or percentages
          </Text>
        </Box>
        <Box
          width="75%"
          minWidth={100}
          maxWidth={500}
          padding={2}
          borderStyle="lg"
          color="infoBase"
        >
          <Text color="light">
            Change the screen width to see the min and max widths take affect{' '}
          </Text>
        </Box>
        <Box fit padding={2} borderStyle="lg" color="errorBase">
          <Text color="light">&quot;fit&quot; sets width to 100% </Text>
        </Box>
      </Box>
    </Flex>
  );
}
