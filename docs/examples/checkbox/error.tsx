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
            id="ErrorState"
            label="Error"
            onChange={noop}
            size="sm"
          />
          <Checkbox
            checked
            errorMessage="Error Message"
            helperText="Helper Text"
            id="ErrorStateChecked"
            label="Error Checked"
            onChange={noop}
            size="sm"
          />
          <Checkbox
            errorMessage="Error Message"
            helperText="Helper Text"
            id="ErrorStateIndeterminate"
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
            id="ErrorState"
            label="Error"
            onChange={noop}
            size="md"
          />
          <Checkbox
            checked
            errorMessage="Error Message"
            helperText="Helper Text"
            id="ErrorStateChecked"
            label="Error Checked"
            onChange={noop}
            size="md"
          />
          <Checkbox
            errorMessage="Error Message"
            helperText="Helper Text"
            id="ErrorStateIndeterminate"
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
