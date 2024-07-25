import { Box } from 'gestalt';
import { DatePicker } from 'gestalt-datepicker';

export default function Example() {
  return (
    <Box padding={8} width="100%">
      <DatePicker id="datepicker" label="No virtual keyboard" onChange={() => {}} />
    </Box>
  );
}
