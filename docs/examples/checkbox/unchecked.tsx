import { Box, Checkbox, Flex } from 'gestalt';

const noop = () => {};

export default function Example() {
  return (
    <Box padding={4}>
      <Flex direction="column" gap={4} height="100%" width="100%">
        <Checkbox
          checked={false}
          helperText="Helper Text"
          id="Unchecked sm"
          label="Unchecked"
          onChange={noop}
          size="sm"
        />
        <Checkbox
          checked={false}
          helperText="Helper Text"
          id="Unchecked md"
          label="Unchecked"
          onChange={noop}
          size="md"
        />
      </Flex>
    </Box>
  );
}
