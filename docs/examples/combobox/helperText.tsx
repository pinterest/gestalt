import { Box, ComboBox } from 'gestalt';

export default function Example() {
  return (
    <Box padding={8} width="100%">
      <ComboBox
        accessibilityClearButtonLabel="Clear the current value"
        helperText="Select one from all your current active accounts."
        id="helperText"
        label="Select account"
        noResultText="No results for your selection"
        options={[]}
      />
    </Box>
  );
}
