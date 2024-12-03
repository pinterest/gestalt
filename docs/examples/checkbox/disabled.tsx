import { Box, Checkbox, Flex } from 'gestalt';

const noop = () => {};

export default function Example() {
  return (
    <Box padding={4}>
      <Flex gap={8} height="100%" width="100%">
        <Flex direction="column" gap={6}>
          <Checkbox
            checked={false}
            disabled
            helperText="Helper Text"
            id="Disabled sm"
            label="Disabled"
            onChange={noop}
            size="sm"
          />
          <Checkbox
            checked
            disabled
            helperText="Helper Text"
            id="Disabled Checked sm"
            label="Disabled Checked"
            onChange={noop}
            size="sm"
          />
          <Checkbox
            disabled
            helperText="Helper Text"
            id="Disabled indeterminate sm"
            indeterminate
            label="Disabled indeterminate "
            onChange={noop}
            size="sm"
          />
        </Flex>
        <Flex direction="column" gap={6}>
          <Checkbox
            checked={false}
            disabled
            helperText="Helper Text"
            id="Disabled md"
            label="Disabled"
            onChange={noop}
            size="md"
          />
          <Checkbox
            checked
            disabled
            helperText="Helper Text"
            id="Disabled Checked md"
            label="Disabled Checked"
            onChange={noop}
            size="md"
          />
          <Checkbox
            disabled
            helperText="Helper Text"
            id="Disabled Indeterminate md"
            indeterminate
            label="Disabled indeterminate"
            onChange={noop}
            size="md"
          />
        </Flex>
      </Flex>
    </Box>
  );
}
