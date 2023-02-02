// @flow strict
import { type Node } from 'react';
import { HelpButton, Flex } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex height="100%" justifyContent="center" alignItems="center">
      <HelpButton
        text="Informational context that's displayed on click"
        accessibilityPopoverLabel="Popover context description"
      />
    </Flex>
  );
}
