import { useState } from 'react';
import { Box, Flex } from 'gestalt';
import { DateField } from 'gestalt-datepicker';

export default function TextFieldSizes() {
  const [input1Text, setInput1Text] = useState<Date | null>(new Date('1995-12-17T03:24:00'));
  const [input2Text, setInput2Text] = useState<Date | null>(new Date('1995-12-17T03:24:00'));

  return (
    <Box padding={8} width="100%">
      <Flex direction="column" gap={6} width="100%">
        <DateField
          disabled
          id="disabled-datefield-md"
          label="Date of birth"
          name="bday_datefield"
          onChange={({ value }) => {
            setInput1Text(value);
          }}
          onClearInput={() => setInput1Text(null)}
          size="md"
          value={input1Text}
        />
        <DateField
          disabled
          id="disabled-datefield-lg"
          label="Date of birth"
          name="bday_datefield"
          onChange={({ value }) => {
            setInput2Text(value);
          }}
          onClearInput={() => setInput2Text(null)}
          size="lg"
          value={input2Text}
        />
      </Flex>
    </Box>
  );
}
