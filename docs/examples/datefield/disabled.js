// @flow strict
import { type Node, useState } from 'react';
import { Box, Flex } from 'gestalt';
import { DateField } from 'gestalt-datepicker';

export default function Example(): Node {
  const [dateValueDisableFuture, setDateValueDisableFuture] = useState<Date | null>(null);
  const [dateValueDisablePast, setDatealueDisablePast] = useState<Date | null>(null);

  const [errorTextDisableFuture, setErrorTextDisableFuture] = useState<?string>(null);
  const [errorTextDisablePast, setErrorTextDisablePast] = useState<?string>(null);

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
          id="disableFuture"
          label="Date of birth"
          helperText="Enter your date of birth"
          onError={({ errorMessage }) => setErrorTextDisableFuture(errorMessage)}
          errorMessage={
            (errorTextDisableFuture &&
              errorTextDisableFuture === 'disableFuture' &&
              'Please, enter a valid past date') ||
            undefined
          }
          onChange={({ value }) => {
            setDateValueDisableFuture(value);
          }}
          value={dateValueDisableFuture}
          onClearInput={() => setDateValueDisableFuture(null)}
          name="bday_datefield"
          disableRange="disableFuture"
        />
      </Box>
      <Box width={400}>
        <DateField
          id="disablePast"
          label="Campaign activation date"
          helperText="Enter an activation date for your campaign"
          onError={({ errorMessage }) => setErrorTextDisablePast(errorMessage)}
          errorMessage={
            (errorTextDisablePast &&
              errorTextDisablePast === 'disablePast' &&
              'Please, enter a valid future date') ||
            undefined
          }
          onChange={({ value }) => {
            setDatealueDisablePast(value);
          }}
          value={dateValueDisablePast}
          onClearInput={() => setDatealueDisablePast(null)}
          name="bday_datefield"
          disableRange="disablePast"
        />
      </Box>
    </Flex>
  );
}
