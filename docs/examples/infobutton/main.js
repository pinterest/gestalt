// @flow strict
import { type Node } from 'react';
import { InfoButton, Flex } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex height="100%" justifyContent="center" alignItems="center">
      <InfoButton
        text="Informational context that's displayed on hover"
        accessibilityLabel="Popover context description"
      />
    </Flex>
  );
}
