// @flow strict
import { type Node } from 'react';
import { Box, Icon, Upsell } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Upsell
        dismissButton={{
          accessibilityLabel: 'Dismiss banner',
          onDismiss: () => {},
        }}
        imageData={{
          component: (
            <Icon
              icon="workflow-status-warning"
              accessibilityLabel="Warning"
              color="default"
              size={32}
            />
          ),
        }}
        message="There was a problem connecting your account."
        primaryAction={{ label: 'Try again', accessibilityLabel: 'Try linking account again' }}
        title="Could not link account"
      />
    </Box>
  );
}
