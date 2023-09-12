// @flow strict
import { type Node } from 'react';
import { Box, Upsell } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Upsell
        dismissButton={{
          accessibilityLabel: 'Dismiss this banner',
          onDismiss: () => {},
        }}
        message="Single line Upsell with no title or call to action."
      />
    </Box>
  );
}
