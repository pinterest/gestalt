import { useState } from 'react';
import { Box, Flex } from 'gestalt';
import { DateField } from 'gestalt-datepicker';

export default function Example() {
  const [dateValue, setDateValue] = useState<Date | null>(null);
  const [errorText, setErrorText] = useState<string | null | undefined>(null);

  return (
    <Flex alignItems="center" gap={4} height="100%" justifyContent="center" width="100%">
      <Box width={400}>
        <DateField
          errorMessage={errorText || undefined}
          helperText="Enter your date of birth"
          id="mainExample"
          label="Date of birth"
          name="bday_datefield"
          onChange={({ value }) => {
            setDateValue(value);
          }}
          onClearInput={() => setDateValue(null)}
          onError={({ errorMessage }) => setErrorText(errorMessage)}
          value={dateValue}
        />
      </Box>
    </Flex>
  );
}
