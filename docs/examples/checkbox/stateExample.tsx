import { ReactNode } from 'react';
import { Box, Checkbox, Flex } from 'gestalt';

const noop = () => {};

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex gap={6} wrap>
        <Checkbox checked={false} id="Unchecked" label="Unchecked" onChange={noop} />
        <Checkbox checked id="Checked" label="Checked" onChange={noop} />
        <Checkbox
          checked={false}
          errorMessage="error message"
          id="ErrorState"
          label="Error"
          onChange={noop}
        />
        <Checkbox checked id="Indeterminate" indeterminate label="Indeterminate" onChange={noop} />
        <Checkbox checked={false} disabled id="Disabled" label="Disabled" onChange={noop} />
      </Flex>
    </Box>
  );
}
