// @flow strict
import type { Node } from 'react';
import { Box } from 'gestalt';
import GestaltDatePicker from 'gestalt-datepicker';

export default function DatePickerSpec(): Node {
  return (
    <Box color="white" padding={1} width={400} height={400}>
      <GestaltDatePicker id="example-visual-testing" label="Select a date" onChange={() => {}} />
    </Box>
  );
}
