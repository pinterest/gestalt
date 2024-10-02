import { Box, ComboBox, Flex } from 'gestalt';

export default function Example() {
  const options = Array(20)
    .fill(0)
    .map((item, index) => ({
      label: `Label-${index + 1}`,
      value: `Value-${index + 1}`,
      subtext: `Subtext-${index + 1}`,
    }));

  return (
    <Box padding={8} width="100%">
      <Flex direction="column" gap={4}>
        <ComboBox
          accessibilityClearButtonLabel="Clear the current value"
          errorMessage="Please select a valid category"
          id="error"
          label="Category"
          noResultText="No results for your selection"
          options={options}
          size="sm"
        />
        <ComboBox
          accessibilityClearButtonLabel="Clear the current value"
          errorMessage="Please select a valid category"
          id="error"
          label="Category"
          noResultText="No results for your selection"
          options={options}
          size="md"
        />
        <ComboBox
          accessibilityClearButtonLabel="Clear the current value"
          errorMessage="Please select a valid category"
          id="error"
          label="Category"
          noResultText="No results for your selection"
          options={options}
          size="lg"
        />
      </Flex>
    </Box>
  );
}
