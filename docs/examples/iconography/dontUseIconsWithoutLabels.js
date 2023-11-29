// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Icon } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Icon icon="sparkle" accessibilityLabel="sparkle" color="default" size={16} />
    </Box>
  );
}
