// @flow strict
import { type Node as ReactNode } from 'react';
import { Flex, Heading, Spinner } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex direction="column" gap={8} maxWidth={400}>
        <Heading align="center" size="500">
          We&apos;re adding new ideas to your home feed
        </Heading>

        <Spinner show accessibilityLabel="Example spinner" />
      </Flex>
    </Flex>
  );
}
