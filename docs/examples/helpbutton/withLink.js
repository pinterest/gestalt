// @flow strict
import { type Node as ReactNode } from 'react';
import { Flex, HelpButton, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex alignItems="center" gap={1} height="100%" justifyContent="center">
      <Text>This is Gestalt</Text>
      <HelpButton
        accessibilityLabel="Click to learn more about gestalt"
        accessibilityPopoverLabel="Expanded information about Gestalt"
        link={{
          href: 'https://gestalt.pinterest.systems/',
          text: 'Read our documentation',
          accessibilityLabel: 'Visit Gestalt portal',
        }}
        text="Gestalt is Pinterest's design system."
      />
    </Flex>
  );
}
