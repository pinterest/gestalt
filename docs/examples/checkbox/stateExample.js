// @flow strict
import { type Node } from 'react';
import { Box, Checkbox, Flex } from 'gestalt';

const noop = () => {};

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex gap={6} wrap>
        <Checkbox checked={false} id="Unchecked" label="Unchecked" onChange={noop} />
        <Checkbox checked id="Checked" label="Checked" onChange={noop} />
        <Checkbox
          checked={false}
          id="ErrorState"
          label="Error"
          errorMessage="error message"
          onChange={noop}
        />
        <Checkbox checked id="Indeterminate" label="Indeterminate" indeterminate onChange={noop} />
        <Checkbox checked={false} id="Disabled" label="Disabled" disabled onChange={noop} />
      </Flex>
    </Box>
  );
}
