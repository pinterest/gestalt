// @flow strict
import { type Node } from 'react';
import { Checkbox, Flex, HelpButton, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex height="100%" justifyContent="center" alignItems="center" gap={1}>
      <Checkbox id="created-pins" onChange={() => {}} />
      <Text>Pins created in the last 30 days</Text>
      <HelpButton
        text="Date range must include at least 1 day in the last 30 days"
        accessibilityPopoverLabel="Date range must include at least 1 day in the last 30 days"
      />
    </Flex>
  );
}
