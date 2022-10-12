// @flow strict
import { useState } from 'react';
import { Flex, NumberField } from 'gestalt';

export default function Example(): React$Node {
  const [currentValue, setCurrentValue] = useState();

  return (
    <Flex alignItems="center" justifyContent="center" height="100%" width="100%">
      <NumberField
        id="best-practices-do-label"
        label="Your age"
        onChange={({ value }) => {
          setCurrentValue(value);
        }}
        value={currentValue}
      />
    </Flex>
  );
}
