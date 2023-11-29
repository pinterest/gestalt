// @flow strict
import { type Node as ReactNode } from 'react';
import { ActivationCard, Box } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <ActivationCard
        dismissButton={{
          accessibilityLabel: 'Dismiss card',
          onDismiss: () => {},
        }}
        link={{
          href: 'https://pinterest.com',
          label: 'Get started',
          accessibilityLabel: '',
        }}
        message="Grow distribution and track Pins linked to your website"
        status="notStarted"
        statusMessage="Not started"
        title="Claim it!"
      />
    </Box>
  );
}
