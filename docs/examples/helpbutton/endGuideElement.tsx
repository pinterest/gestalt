import { Checkbox, Flex, HelpButton, Text } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" gap={1} height="100%" justifyContent="center">
      <Checkbox
        id="created-pins"
        label="Created pins checkbox"
        labelDisplay="hidden"
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
