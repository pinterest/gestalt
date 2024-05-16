import { ReactNode } from 'react';
import { Box, Flex } from 'gestalt';

export default function Example() {
  return (
    <Flex
      alignItems="center"
      gap={{ column: 0, row: 3 }}
      height="100%"
      justifyContent="center"
      width="100%"
    >
      <Box color="darkWash" lgPadding={8} mdPadding={4} padding={0} smPadding={1}>
        <Box color="successBase" height={40} width={40} />
      </Box>
      <Box color="darkWash" lgPaddingX={8} mdPaddingX={4} paddingX={0} smPaddingX={1}>
        <Box color="infoBase" height={40} width={40} />
      </Box>
      <Box color="darkWash" lgPaddingY={8} mdPaddingY={4} paddingY={0} smPaddingY={1}>
        <Box color="warningBase" height={40} width={40} />
      </Box>
    </Flex>
  );
}
