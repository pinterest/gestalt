import { ReactNode } from 'react';
import { Box, Column, Flex, Text } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Column mdSpan={6} span={12}>
        <Box color="secondary" padding={1}>
          <Box color="default" paddingY={2}>
            <Box display="block" mdDisplay="none">
              <Text align="center">
                <code>span = 12</code>
              </Text>
            </Box>
            <Box display="none" mdDisplay="block">
              <Text align="center">
                <code>span = 6</code>
              </Text>
            </Box>
          </Box>
        </Box>
      </Column>
      <Column mdSpan={6} span={12}>
        <Box color="secondary" padding={1}>
          <Box color="default" paddingY={2}>
            <Box display="block" mdDisplay="none">
              <Text align="center">
                <code>span = 12</code>
              </Text>
            </Box>
            <Box display="none" mdDisplay="block">
              <Text align="center">
                <code>span = 6</code>
              </Text>
            </Box>
          </Box>
        </Box>
      </Column>
    </Flex>
  );
}
