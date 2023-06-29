// @flow strict
import { type Node, useState } from 'react';
import { Box, Flex } from 'gestalt';
import { DateField } from 'gestalt-datepicker';

export default function Example(): Node {
  const [dateValue, setDateValue] = useState<?Date>(null);
  const [errorText, setErrorText] = useState<?string>(null);

  return (
    <Flex alignItems="center" gap={4} height="100%" justifyContent="center" width="100%">
      <Box width={400}>
        <DateField
          id="mainExample"
          label="Date of birth"
          helperText="Enter your date of birth"
          onError={({ errorMessage }) => setErrorText(errorMessage)}
          errorMessage={errorText || undefined}
          onChange={({ value }) => {
            setDateValue(value);
          }}
          value={dateValue}
          onClearInput={() => setDateValue(null)}
          name="bday_datefield"
        />
      </Box>
    </Flex>
  );
}
