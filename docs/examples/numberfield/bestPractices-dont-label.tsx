import { useState } from 'react';
import { Flex, NumberField } from 'gestalt';

export default function Example() {
  const [currentValue, setCurrentValue] = useState<undefined | number>();

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <NumberField
        id="best-practice-dont-label"
        label=""
        onChange={({ value }) => {
          setCurrentValue(value);
        }}
        value={currentValue}
      />
    </Flex>
  );
}
