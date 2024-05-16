import {ReactNode} from 'react';
import { Box } from 'gestalt';
import { DatePicker } from 'gestalt-datepicker';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <DatePicker id="datepicker" label="No virtual keyboard" onChange={() => {}} />
    </Box>
  );
}
