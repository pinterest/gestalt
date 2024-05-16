import { ReactNode } from 'react';
import { BannerUpsell, Box, Icon } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <BannerUpsell
        dismissButton={{
          accessibilityLabel: 'Dismiss banner',
          onDismiss: () => {},
        }}
        imageData={{
          component: (
            <Icon
              accessibilityLabel="Warning"
              color="default"
              icon="workflow-status-warning"
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
