// @flow strict
import { type Node } from 'react';
import { Flex } from 'gestalt';
import DatePicker from 'gestalt-datepicker';

export default function Example(): Node {
  return (
    <Flex alignItems="center" gap={4} height="100%" justifyContent="center" width="100%">
      <DatePicker id="example-page-header" label="Select a date" onChange={() => {}} />
    </Flex>
  );
}
