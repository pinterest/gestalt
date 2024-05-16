import {ReactNode} from 'react';
import { Box, IconButton, Tooltip } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Tooltip accessibilityLabel="" text="Share">
        <IconButton
          accessibilityLabel="Share"
          bgColor="white"
          icon="share"
          iconColor="darkGray"
          size="lg"
        />
      </Tooltip>
    </Box>
  );
}
