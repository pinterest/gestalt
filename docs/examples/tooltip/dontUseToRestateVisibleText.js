// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Button, Tooltip } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Tooltip text="Save">
        <Button color="red" text="Save" size="lg" />
      </Tooltip>
    </Box>
  );
}
