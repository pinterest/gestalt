// @flow strict
import { type Node } from 'react';
import { Flex, Heading, Spinner } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex direction="column" gap={8} maxWidth={450}>
        <Heading align="center" size="500">
          Your promotion has been submitted and is being reviewed
        </Heading>

        <Spinner show accessibilityLabel="Example spinner" />
      </Flex>
    </Flex>
  );
}
