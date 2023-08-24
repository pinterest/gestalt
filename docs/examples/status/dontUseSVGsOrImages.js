// @flow strict
import { type Node } from 'react';
import { Box, Icon } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Icon icon="workflow-status-problem" size="24" accessibilityLabel="This item has an error" />
    </Box>
  );
}
