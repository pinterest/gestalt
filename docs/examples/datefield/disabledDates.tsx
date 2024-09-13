import { useState } from 'react';
import { Box, Flex } from 'gestalt';
import { DateField } from 'gestalt-datepicker';

export default function Example() {
  const [dateValueDisableFuture, setDateValueDisableFuture] = useState<Date | null>(null);
  const [dateValueDisablePast, setDatealueDisablePast] = useState<Date | null>(null);

  const [errorTextDisableFuture, setErrorTextDisableFuture] = useState<string | null | undefined>(
    null,
  );
  const [errorTextDisablePast, setErrorTextDisablePast] = useState<string | null | undefined>(null);

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
          disableRange="disableFuture"
          errorMessage={
            (errorTextDisableFuture &&
              errorTextDisableFuture === 'disableFuture' &&
              'Please, enter a valid past date') ||
            undefined
          }
          helperText="Enter your date of birth"
          id="disableFuture"
          label="Date of birth"
          name="bday_datefield"
          onChange={({ value }) => {
            setDateValueDisableFuture(value);
          }}
          onClearInput={() => setDateValueDisableFuture(null)}
          onError={({ errorMessage }) => setErrorTextDisableFuture(errorMessage)}
          value={dateValueDisableFuture}
        />
      </Box>
      <Box width={400}>
        <DateField
          disableRange="disablePast"
          errorMessage={
            (errorTextDisablePast &&
              errorTextDisablePast === 'disablePast' &&
              'Please, enter a valid future date') ||
            undefined
          }
          helperText="Enter an activation date for your campaign"
          id="disablePast"
          label="Campaign activation date"
          name="bday_datefield"
          onChange={({ value }) => {
            setDatealueDisablePast(value);
          }}
          onClearInput={() => setDatealueDisablePast(null)}
          onError={({ errorMessage }) => setErrorTextDisablePast(errorMessage)}
          value={dateValueDisablePast}
        />
      </Box>
    </Flex>
  );
}
