import { useState } from 'react';
import { Box } from 'gestalt';
import { DateField } from 'gestalt-datepicker';

export default function Example() {
  const [dateValue, setDateValue] = useState<Date | null>(null);
  const [errorText, setErrorText] = useState<string | null | undefined>(null);

  return (
    <Box padding={8} width="100%">
      <DateField
        errorMessage={errorText || undefined}
        helperText="Enter your date of birth"
        id="mainExample"
        label="Date of birth"
        name="bday_datefield"
        onChange={(value) => {
          console.log('value', value)
          setDateValue(value);
        }}
        onClearInput={() => setDateValue(null)}
        onError={(p) => { console.log(p)}}
        value={dateValue}
      />
    </Box>
  );
}
