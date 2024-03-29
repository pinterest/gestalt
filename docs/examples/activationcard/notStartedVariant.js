// @flow strict
import { type Node as ReactNode } from 'react';
import { ActivationCard, Box, Flex } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex>
        <ActivationCard
          dismissButton={{
            accessibilityLabel: 'Dismiss card',
            onDismiss: () => {},
          }}
          link={{
            href: 'https://pinterest.com',
            label: 'Claim your website now',
            accessibilityLabel: '',
          }}
          message="Grow distribution and track Pins linked to your website"
          status="notStarted"
          statusMessage="Not started"
          title="Claim your website"
        />
      </Flex>
    </Box>
  );
}
