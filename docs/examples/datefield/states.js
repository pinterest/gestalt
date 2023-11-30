// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Flex } from 'gestalt';
import { DateField } from 'gestalt-datepicker';

export default function Example(): ReactNode {
  return (
    <Flex
      alignItems="center"
      gap={4}
      height="100%"
      justifyContent="center"
      width="100%"
      direction="column"
    >
      <Box width={400}>
        <DateField
          id="disabled_example"
          disabled
          label="Date of birth"
          onError={() => {}}
          onChange={() => {}}
          value={new Date('1995-12-17T03:24:00')}
          onClearInput={() => {}}
          name="bday_datefield"
        />
      </Box>
      <Box width={400}>
        <DateField
          id="readonly_example"
          readOnly
          label="Date of birth"
          onError={() => {}}
          onChange={() => {}}
          value={new Date('1995-12-17T03:24:00')}
          onClearInput={() => {}}
          name="bday_datefield"
        />
      </Box>
    </Flex>
  );
}
