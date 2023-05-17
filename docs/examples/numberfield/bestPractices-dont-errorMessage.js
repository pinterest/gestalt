// @flow strict
import { useState, type Node } from 'react';
import { Flex, NumberField } from 'gestalt';

export default function Example(): Node {
  const [currentValue, setCurrentValue] = useState<void | number>();

  return (
    <Flex alignItems="center" justifyContent="center" height="100%" width="100%">
      <NumberField
        errorMessage="There is an error"
        helperText="Minimum is $5"
        id="best-practices-dont-error-message"
        label="Monthy ad spend"
        onChange={({ value }) => {
          setCurrentValue(value);
        }}
        value={currentValue}
      />
    </Flex>
  );
}
