// @flow strict
import { type Node } from 'react';
import { Box, Icon } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Icon icon="pincode" accessibilityLabel="pin code" color="default" size={32} />
    </Box>
  );
}
