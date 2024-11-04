import { Box, ComboBox, Flex } from 'gestalt';

export default function Example() {
  return (
    <Box padding={8} width="100%">
      <Flex direction="column" gap={4}>
        <ComboBox
          accessibilityClearButtonLabel="Clear the current value"
          helperText="Select one from all your current active accounts."
          id="helperText"
          label="Select account"
          noResultText="No results for your selection"
          options={[]}
          size="sm"
        />
        <ComboBox
          accessibilityClearButtonLabel="Clear the current value"
          helperText="Select one from all your current active accounts."
          id="helperText"
          label="Select account"
          noResultText="No results for your selection"
          options={[]}
          size="md"
        />
        <ComboBox
          accessibilityClearButtonLabel="Clear the current value"
          helperText="Select one from all your current active accounts."
          id="helperText"
          label="Select account"
          noResultText="No results for your selection"
          options={[]}
          size="lg"
        />
      </Flex>
    </Box>
  );
}
