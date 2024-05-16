import {ReactNode} from 'react';
import { Box, Heading } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Heading size="500">An H2 Heading example</Heading>;
    </Box>
  );
}
