// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Button } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Box width={150}>
        <Button color="red" text="Go to the latest updates" />
      </Box>
    </Box>
  );
}
