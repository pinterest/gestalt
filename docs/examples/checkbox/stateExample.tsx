import { Checkbox, Flex } from 'gestalt';

const noop = () => {};

export default function Example() {
  return (
    <Flex alignItems="center" gap={8} height="100%" justifyContent="center" wrap>
      <Flex direction="column" gap={6}>
        <Checkbox
          checked={false}
          helperText="Helper Text"
          id="Unchecked"
          label="Unchecked"
          onChange={noop}
        />
        <Checkbox checked helperText="Helper Text" id="Checked" label="Checked" onChange={noop} />
        <Checkbox
          checked
          helperText="Helper Text"
          id="Indeterminate"
          indeterminate
          label="Indeterminate"
          onChange={noop}
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
        />
        <Checkbox
          checked
          errorMessage="Error Message"
          helperText="Helper Text"
          id="ErrorStateChecked"
          label="Error Checked"
          onChange={noop}
        />
        <Checkbox
          errorMessage="Error Message"
          helperText="Helper Text"
          id="ErrorStateIndeterminate"
          indeterminate
          label="Error indeterminate"
          onChange={noop}
        />
      </Flex>
      <Flex direction="column" gap={6}>
        <Checkbox
          checked={false}
          disabled
          helperText="Helper Text"
          id="Disabled"
          label="Disabled"
          onChange={noop}
        />
        <Checkbox
          checked
          disabled
          helperText="Helper Text"
          id="DisabledChecked"
          label="Disabled Checked"
          onChange={noop}
        />
        <Checkbox
          disabled
          helperText="Helper Text"
          id="DisabledIndeterminate"
          indeterminate
          label="Disabled indeterminate"
          onChange={noop}
        />
      </Flex>
    </Flex>
  );
}
