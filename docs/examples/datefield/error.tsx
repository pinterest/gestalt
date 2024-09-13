import { useState } from 'react';
import { Box, Flex } from 'gestalt';
import { DateField } from 'gestalt-datepicker';

export default function Example() {
  const [dateValue1] = useState<Date | null>(null);
  const [dateValue2] = useState<Date | null>(null);

  return (
    <Box padding={8} width="100%">
      <Flex direction="column" gap={6} width="100%">
        <DateField
          disableRange="disableFuture"
          errorMessage="Please, select a valid birth date"
          helperText="Enter your date of birth"
          id="error-datefield-md"
          label="Date of birth"
          name="bday_datefield"
          onChange={() => {}}
          onClearInput={() => {}}
          onError={() => {}}
          size="md"
          value={dateValue1}
        />
        <DateField
          disableRange="disableFuture"
          errorMessage="Please, select a valid birth date"
          helperText="Enter your date of birth"
          id="error-datefield-lg"
          label="Date of birth"
          name="bday_datefield"
          onChange={() => {}}
          onClearInput={() => {}}
          onError={() => {}}
          size="lg"
          value={dateValue2}
        />
      </Flex>
    </Box>
  );
}
