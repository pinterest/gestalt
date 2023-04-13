// @flow strict
import { type Node } from 'react';
import { Flex } from 'gestalt';
import { DateField } from 'gestalt-datepicker';

export default function Example(): Node {
  return (
    <Flex alignItems="center" gap={4} height="100%" justifyContent="center" width="100%">
      <DateField
        id="mainExample"
        label="Date of birth"
        helperText="Enter your date of birth"
        // errorMessage="Enter valid date of birth"
      />
    </Flex>
  );
}
