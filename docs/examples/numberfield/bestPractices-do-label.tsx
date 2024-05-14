import { useState } from 'react';
import { Flex, NumberField } from 'gestalt';

export default function Example() {
  const [currentValue, setCurrentValue] = useState<number | undefined>(undefined);

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
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
