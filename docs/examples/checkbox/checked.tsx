import { Box, Checkbox, Flex } from 'gestalt';

const noop = () => {};

export default function Example() {
  return (
    <Box padding={4}>
      <Flex direction="column" gap={4} height="100%" width="100%">
        <Checkbox
          checked
          helperText="Helper Text"
          id="Checked sm"
          label="Checked"
          onChange={noop}
          size="sm"
        />

        <Checkbox
          checked
          helperText="Helper Text"
          id="Checked md"
          label="Checked"
          onChange={noop}
          size="md"
        />
      </Flex>
    </Box>
  );
}
