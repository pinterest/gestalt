// @flow strict
import { useState, type Node } from 'react';
import { Flex } from 'gestalt';
import { DateField } from 'gestalt-datepicker';

export default function Example(): Node {
  const [dateValueDisableFuture, setDateValueDisableFuture] = useState(null);
  const [dateValueDisablePast, setDatealueDisablePast] = useState(null);

  const [errorText, setErrorText] = useState(null);

  return (
    <Flex
      alignItems="center"
      gap={6}
      height="100%"
      justifyContent="center"
      width="100%"
      direction="column"
    >
      <DateField
        id="disableFuture"
        label="Date of birth"
        helperText="Enter your date of birth"
        onError={({ errorMessage }) => setErrorText(errorMessage)}
        errorMessage={errorText || undefined}
        onChange={({ value }) => {
          setDateValueDisableFuture(value);
        }}
        value={dateValueDisableFuture}
        onClearInput={() => setDateValueDisableFuture(null)}
        name="bday_datefield"
        disableRange="disableFuture"
      />
      <DateField
        id="disablePast"
        label="Campaign activation date"
        helperText="Enter an activation date for your campaign"
        onError={({ errorMessage }) => setErrorText(errorMessage)}
        errorMessage={errorText || undefined}
        onChange={({ value }) => {
          setDatealueDisablePast(value);
        }}
        value={dateValueDisablePast}
        onClearInput={() => setDatealueDisablePast(null)}
        name="bday_datefield"
        disableRange="disablePast"
      />
    </Flex>
  );
}
