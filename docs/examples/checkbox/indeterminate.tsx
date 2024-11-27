import { Box, Checkbox, Flex } from 'gestalt';

const noop = () => {};

export default function Example() {
  return (
    <Box padding={4}>
      <Flex direction="column" gap={4} height="100%" width="100%">
        <Checkbox
          checked
          helperText="Helper Text"
          id="Indeterminate sm"
          indeterminate
          label="Indeterminate"
          onChange={noop}
          size="sm"
        />
        <Checkbox
          checked
          helperText="Helper Text"
          id="Indeterminate md"
          indeterminate
          label="Indeterminate"
          onChange={noop}
          size="md"
        />
      </Flex>
    </Box>
  );
}
