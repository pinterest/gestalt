// @flow strict
import { type Node } from 'react';
import { Box } from 'gestalt';
import { DatePicker } from 'gestalt-datepicker';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <DatePicker id="datepicker" label="No virtual keyboard" onChange={() => {}} />
    </Box>
  );
}
