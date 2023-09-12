// @flow strict
import { type Node } from 'react';
import { Box, Icon } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Icon icon="sparkle" accessibilityLabel="sparkle" color="default" size={16} />
    </Box>
  );
}
