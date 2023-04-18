// @flow strict
import { useState, type Node } from 'react';
import { Flex } from 'gestalt';
import { DateField } from 'gestalt-datepicker';

export default function Example(): Node {
  const [dateValue, setDateValue] = useState(null);
  const [errorText, setErrorText] = useState(null);

  return (
    <Flex alignItems="center" gap={4} height="100%" justifyContent="center" width="100%">
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
    </Flex>
  );
}
