// @flow strict
import { type Node } from 'react';
import { Flex } from 'gestalt';
import { DateField } from 'gestalt-datepicker';

export default function Example(): Node {
  return (
    <Flex alignItems="center" gap={4} height="100%" justifyContent="center" width="100%">
      <DateField
        id="errorExample"
        disabled
        label="Date of birth"
        helperText="Enter your date of birth"
        onError={() => {}}
        onChange={() => {}}
        value={new Date('1995-12-17T03:24:00')}
        onClearInput={() => {}}
        name="bday_datefield"
        size="lg"
      />
      <DateField
        id="errorExample"
        readOnly
        label="Date of birth"
        helperText="Enter your date of birth"
        onError={() => {}}
        onChange={() => {}}
        value={new Date('1995-12-17T03:24:00')}
        onClearInput={() => {}}
        name="bday_datefield"
        size="lg"
      />
    </Flex>
  );
}
