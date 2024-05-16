import {ReactNode} from 'react';
import { Box, Button } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Box width={150}>
        <Button color="red" text="Go to the latest updates" />
      </Box>
    </Box>
  );
}
