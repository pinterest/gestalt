// @flow strict
import { type Node } from 'react';
import { Callout, Flex, Box } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Box paddingY={8} paddingX={8}>
        <Callout
          dismissButton={{
            accessibilityLabel: 'Dismiss this banner',
            onDismiss: () => {},
          }}
          iconAccessibilityLabel="Info"
          message="Bewerben Sie sich beim Verified Merchant Program"
          primaryAction={{
            accessibilityLabel: 'Loslegen: Verified Merchant Program',
            href: 'https://pinterest.com',
            label: 'Loslegen',
            target: 'blank',
          }}
          secondaryAction={{
            accessibilityLabel: 'Erfahren Sie mehr: Verified Merchant Program',
            href: 'https://pinterest.com',
            label: 'Erfahren Sie mehr',
            target: 'blank',
          }}
          title="Ihr Geschäftskonto wurde erstellt!"
          type="info"
        />
      </Box>
    </Flex>
  );
}
