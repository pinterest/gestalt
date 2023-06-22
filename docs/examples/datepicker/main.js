// @flow strict
import { type Node } from 'react';
import { Box, Flex } from 'gestalt';
import { DatePicker } from 'gestalt-datepicker';

export default function Example(): Node {
  return (
    <Flex alignItems="start" height="100%" justifyContent="center" width="100%">
      <Box padding={2}>
        <DatePicker id="main" label="Select a date" onChange={() => {}} />
      </Box>
    </Flex>
  );
}
