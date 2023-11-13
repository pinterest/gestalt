// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Upsell } from 'gestalt';

export default function Example(): ReactNode {
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
