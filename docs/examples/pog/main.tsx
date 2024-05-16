import { ReactNode } from 'react';
import { Box, Pog } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Pog icon="heart" iconColor="red" />
    </Box>
  );
}
