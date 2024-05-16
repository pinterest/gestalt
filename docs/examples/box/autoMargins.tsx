import { ReactNode } from 'react';
import { Box, Flex } from 'gestalt';

export default function Example() {
  return (
    <Flex height="100%" justifyContent="center" width="100%">
      <Box color="infoBase" column={12} marginEnd={12} marginStart={12}>
        <Box borderStyle="sm" color="successBase" column={5} height={100} margin="auto" />
        <Box borderStyle="sm" color="warningBase" column={3} height={100} marginStart="auto" />
      </Box>
    </Flex>
  );
}
