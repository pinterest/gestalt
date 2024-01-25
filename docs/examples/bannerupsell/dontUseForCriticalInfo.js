// @flow strict
import { type Node as ReactNode } from 'react';
import { BannerUpsell, Box, Icon } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <BannerUpsell
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
        primaryAction={{
          label: 'Try again',
          accessibilityLabel: 'Try linking account again',
          role: 'button',
          onClick: () => {},
        }}
        title="Could not link account"
      />
    </Box>
  );
}
