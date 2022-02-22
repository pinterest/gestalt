// @flow strict
import { type Node } from 'react';
import { Box, IconButton } from 'gestalt';

export default function ButtonSpec(): Node {
  return (
    <Box padding={1}>
      <IconButton
        accessibilityLabel="IconButton"
        icon="visit"
        bgColor="lightGray"
        iconColor="darkGray"
      />
    </Box>
  );
}
