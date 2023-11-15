// @flow strict
import { type Node as ReactNode } from 'react';
import { Box } from 'gestalt';
import { DatePicker } from 'gestalt-datepicker';

export default function Example(): ReactNode {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <DatePicker id="datepicker" label="No virtual keyboard" onChange={() => {}} />
    </Box>
  );
}
