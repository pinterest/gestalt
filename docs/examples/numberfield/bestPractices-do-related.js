// @flow strict
import { useState } from 'react';
import { Flex, NumberField } from 'gestalt';

export default function Example(): React$Node {
  const [firstValue, setFirstValue] = useState();
  const [secondValue, setSecondValue] = useState();

  return (
    <Flex alignItems="center" gap={4} justifyContent="center" height="100%" width="100%">
      <NumberField
        id="best-practices-do-related-first"
        label="First value"
        onChange={({ value }) => {
          setFirstValue(value);
        }}
        value={firstValue}
      />
      <NumberField
        id="best-practices-do-related-second"
        label="Second value"
        onChange={({ value }) => {
          setSecondValue(value);
        }}
        value={secondValue}
      />
    </Flex>
  );
}
