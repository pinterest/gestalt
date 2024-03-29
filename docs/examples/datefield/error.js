// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Box, Flex } from 'gestalt';
import { DateField } from 'gestalt-datepicker';

export default function Example(): ReactNode {
  const [dateValue, setDateValue] = useState<Date | null>(null);
  const [errorText, setErrorText] = useState<?string>(null);

  return (
    <Flex alignItems="center" gap={4} height="100%" justifyContent="center" width="100%">
      <Box width={400}>
        <DateField
          disableRange="disableFuture"
          errorMessage={errorText || undefined}
          helperText="Enter your date of birth"
          id="errorExample"
          label="Date of birth"
          name="bday_datefield"
          onChange={({ value }) => {
            setDateValue(value);
          }}
          onClearInput={() => {
            setErrorText(null);
            setDateValue(null);
          }}
          onError={({ errorMessage, value }) => {
            const date = value ? new Date(value) : null;

            if (errorMessage === 'invalidDate') return;
            if (errorMessage === 'disableFuture' || (date && date.getFullYear() === 1))
              setErrorText('Please, select a valid birth date');
            if (date && date.getFullYear() > 1) setErrorText(null);
          }}
          value={dateValue}
        />
      </Box>
    </Flex>
  );
}
