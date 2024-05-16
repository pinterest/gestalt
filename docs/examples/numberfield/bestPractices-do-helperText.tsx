import { useState } from 'react';
import { Flex, NumberField } from 'gestalt';

export default function Example() {
  const [currentValue, setCurrentValue] = useState<undefined | number>(undefined);

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <NumberField
        helperText="Code was texted to you"
        id="best-practices-do-helper-text"
        label="Confirmation code"
        onChange={({ value }) => {
          setCurrentValue(value);
        }}
        value={currentValue}
      />
    </Flex>
  );
}
