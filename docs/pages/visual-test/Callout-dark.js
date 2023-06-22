// @flow strict
import { type Node } from 'react';
import { Box, Callout, ColorSchemeProvider, Flex } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" display="inlineBlock" padding={1}>
        <Flex
          direction="column"
          gap={{
            row: 0,
            column: 2,
          }}
        >
          <Callout
            dismissButton={{
              accessibilityLabel: 'Dismiss this banner',
              onDismiss: () => {},
            }}
            iconAccessibilityLabel="Info"
            message="Apply to the Verified Merchant Program"
            primaryAction={{
              accessibilityLabel: 'Get started: Verified Merchant Program',
              href: 'https://pinterest.com',
              label: 'Get started',
              target: 'blank',
            }}
            secondaryAction={{
              accessibilityLabel: 'Learn more: Verified Merchant Program',
              href: 'https://pinterest.com',
              label: 'Learn more',
              target: 'blank',
            }}
            title="Your business account was created!"
            type="info"
          />
          <Callout
            iconAccessibilityLabel="Error"
            message="Your tag has errors, so information may be outdated. Fix your tag for the most accurate metrics."
            primaryAction={{
              accessibilityLabel: 'Fix Pinterest tag',
              href: 'https://pinterest.com',
              label: 'Fix tag',
              target: 'blank',
            }}
            title="Pinterest tag needs attention"
            type="error"
          />
        </Flex>
      </Box>
    </ColorSchemeProvider>
  );
}
