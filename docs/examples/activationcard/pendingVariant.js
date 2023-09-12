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
