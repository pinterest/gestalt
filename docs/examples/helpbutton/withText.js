// @flow strict
import { type Node } from 'react';
import { HelpButton, Text, Flex } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex height="100%" justifyContent="center" alignItems="center" gap={1}>
      <Text>Gestalt is Pinterest`s design system.</Text>
      <HelpButton
        accessibilityLabel="Click to learn more about gestalt"
        accessibilityPopoverLabel="Expanded information about gestalt"
        link={{
          href: '#',
          text: 'Visit our portal',
          accessibilityLabel: 'Visit Gestalt portal',
          onClick: () => {},
        }}
        text={
          <Text>
            <Text weight="bold" inline>
              Gestalt
            </Text>{' '}
            is Pinterest`s design system.
          </Text>
        }
      />
    </Flex>
  );
}
