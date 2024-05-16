import {ReactNode} from 'react';
import { Box, IconButton } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <IconButton accessibilityLabel="Search your Pins" icon="search" />
    </Box>
  );
}
