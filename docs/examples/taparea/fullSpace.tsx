import {ReactNode} from 'react';
import { Box, TapArea } from 'gestalt';

export default function Example() {
  return (
    <Box color="secondary" height="100%" width="100%">
      <TapArea fullHeight fullWidth onTap={() => {}} />
    </Box>
  );
}
