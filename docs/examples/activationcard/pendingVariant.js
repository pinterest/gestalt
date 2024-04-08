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
            label: 'Learn more',
            accessibilityLabel: 'Learn more: website claim status',
          }}
          message="We will notify you via email as soon as your site has been successfully claimed."
          status="pending"
          statusMessage="Pending"
          title="Claim your website"
        />
      </Flex>
    </Box>
  );
}
