import { Box, ComboBox } from 'gestalt';

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
      <ComboBox
        accessibilityClearButtonLabel="Clear the current value"
        id="subtext"
        label="Choose a value"
        noResultText="No results for your selection"
        options={options}
        placeholder="Select a value"
      />
    </Box>
  );
}
