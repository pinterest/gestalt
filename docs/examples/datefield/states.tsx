import {ReactNode} from 'react';
import { Box, Flex } from 'gestalt';
import { DateField } from 'gestalt-datepicker';

export default function Example() {
  return (
    <Flex
      alignItems="center"
      direction="column"
      gap={4}
      height="100%"
      justifyContent="center"
      width="100%"
    >
      <Box width={400}>
        <DateField
          disabled
          id="disabled_example"
          label="Date of birth"
          name="bday_datefield"
          onChange={() => {}}
          onClearInput={() => {}}
          onError={() => {}}
          value={new Date('1995-12-17T03:24:00')}
        />
      </Box>
      <Box width={400}>
        <DateField
          id="readonly_example"
          label="Date of birth"
          name="bday_datefield"
          onChange={() => {}}
          onClearInput={() => {}}
          onError={() => {}}
          readOnly
          value={new Date('1995-12-17T03:24:00')}
        />
      </Box>
    </Flex>
  );
}
