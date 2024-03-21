// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Button, Tooltip } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Tooltip text="Pssst! Looks like you've already saved this Pin.">
        <Button color="red" size="lg" text="Save" />
      </Tooltip>
    </Box>
  );
}
