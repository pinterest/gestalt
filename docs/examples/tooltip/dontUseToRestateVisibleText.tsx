import { ReactNode } from 'react';
import { Box, Button, Tooltip } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Tooltip text="Save">
        <Button color="red" size="lg" text="Save" />
      </Tooltip>
    </Box>
  );
}
