// @flow strict
import { type Node as ReactNode } from 'react';
import { Checkbox, Flex, HelpButton, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex height="100%" justifyContent="center" alignItems="center" gap={1}>
      <Checkbox
        labelDisplay="hidden"
        label="Created pins checkbox"
        id="created-pins"
        onChange={() => {}}
      />
      <Text>Pins created in the last 30 days</Text>
      <HelpButton
        accessibilityLabel="Click to learn more about the last 30 days of created pins"
        accessibilityPopoverLabel="Expanded information about the last 30 days of created pins"
        text="Date range must include at least 1 day in the last 30 days"
      />
    </Flex>
  );
}
