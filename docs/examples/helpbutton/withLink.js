// @flow strict
import { type Node } from 'react';
import { Flex, HelpButton, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex height="100%" justifyContent="center" alignItems="center" gap={1}>
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
