// @flow strict
import { type Node } from 'react';
import { Box, Icon } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Box color="infoWeak" padding={12} display="inlineBlock" rounding={4}>
        <Icon icon="shopping-bag" accessibilityLabel="shopping bag" color="default" size={24} />
      </Box>
    </Box>
  );
}
