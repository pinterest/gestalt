// @flow strict
import { type Node } from 'react';
import { ActivationCard, Box, Flex } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
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
