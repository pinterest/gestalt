// @flow strict
import { type Node, useState } from 'react';
import { Box, Flex } from 'gestalt';
import { DateField } from 'gestalt-datepicker';

export default function Example(): Node {
  const [dateValue, setDateValue] = useState<Date | null>(null);
  const [errorText, setErrorText] = useState<?string>(null);

  return (
    <Flex alignItems="center" gap={4} height="100%" justifyContent="center" width="100%">
      <Box width={400}>
        <DateField
          id="errorExample"
          label="Date of birth"
          helperText="Enter your date of birth"
          onError={({ errorMessage, value }) => {
            const date = value ? new Date(value) : null;

            if (errorMessage === 'invalidDate') return;
            if (errorMessage === 'disableFuture' || (date && date.getFullYear() === 1))
              setErrorText('Please, select a valid birth date');
            if (date && date.getFullYear() > 1) setErrorText(null);
          }}
          errorMessage={errorText || undefined}
          onChange={({ value }) => {
            setDateValue(value);
          }}
          value={dateValue}
          disableRange="disableFuture"
          onClearInput={() => {
            setErrorText(null);
            setDateValue(null);
          }}
          name="bday_datefield"
        />
      </Box>
    </Flex>
  );
}
