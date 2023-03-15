// @flow strict
import { type Node } from 'react';
import { Box } from 'gestalt';
import DatePicker from 'gestalt-datepicker';

export default function Example(): Node {
  return (
    <Box padding={4}>
      <DatePicker
        id="example-page-header"
        label="Select a date"
        onChange={() => {}}
        idealDirection="down"
      />
    </Box>
  );
}
