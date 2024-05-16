import { ReactNode } from 'react';
import { Box, Flex, Status } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex>
        <Status subtext="Updated 2 days ago" title="OK" type="ok" />
      </Flex>
    </Box>
  );
}
