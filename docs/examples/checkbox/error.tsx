import { Box, Checkbox, Flex } from 'gestalt';

const noop = () => {};

export default function Example() {
  return (
    <Box padding={4}>
      <Flex gap={8} height="100%" width="100%">
        <Flex direction="column" gap={6}>
          <Checkbox
            checked={false}
            errorMessage="Error Message"
            helperText="Helper Text"
            id="Error sm"
            label="Error"
            onChange={noop}
            size="sm"
          />
          <Checkbox
            checked
            errorMessage="Error Message"
            helperText="Helper Text"
            id="Error Checked sm"
            label="Error Checked"
            onChange={noop}
            size="sm"
          />
          <Checkbox
            errorMessage="Error Message"
            helperText="Helper Text"
            id="Error Indeterminate sm"
            indeterminate
            label="Error indeterminate"
            onChange={noop}
            size="sm"
          />
        </Flex>
        <Flex direction="column" gap={6}>
          <Checkbox
            checked={false}
            errorMessage="Error Message"
            helperText="Helper Text"
            id="Error md"
            label="Error"
            onChange={noop}
            size="md"
          />
          <Checkbox
            checked
            errorMessage="Error Message"
            helperText="Helper Text"
            id="Error Checked md"
            label="Error Checked"
            onChange={noop}
            size="md"
          />
          <Checkbox
            errorMessage="Error Message"
            helperText="Helper Text"
            id="Error Indeterminate  md"
            indeterminate
            label="Error indeterminate"
            onChange={noop}
            size="md"
          />
        </Flex>
      </Flex>
    </Box>
  );
}
