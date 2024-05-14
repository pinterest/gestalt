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
    <Box height="100%" padding={2} width="100%">
      <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
        <Box width={320}>
          <ComboBox
            accessibilityClearButtonLabel="Clear the current value"
            id="subtext"
            label="Choose a value"
            noResultText="No results for your selection"
            options={options}
            placeholder="Select a value"
          />
        </Box>
      </Flex>
    </Box>
  );
}
