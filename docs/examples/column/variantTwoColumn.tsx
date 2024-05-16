import {ReactNode} from 'react';
import { Box, Column, Flex, Text } from 'gestalt';

export default function Example() {
  return (
    (<Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      {Array(2)
        .fill()
        .map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          (<Column key={i} span={6}>
            <Box color="secondary" padding={1}>
              <Box color="default" paddingY={2}>
                <Text align="center">
                  <code>span = 6</code>
                </Text>
              </Box>
            </Box>
          </Column>)
        ))}
    </Flex>)
  );
}
