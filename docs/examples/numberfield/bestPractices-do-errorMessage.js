// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Flex, NumberField } from 'gestalt';

export default function Example(): ReactNode {
  const [currentValue, setCurrentValue] = useState<void | number>(undefined);

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <NumberField
        errorMessage="Please enter a value of at least $5"
        helperText="Minimum is $5"
        id="best-practices-do-error-message"
        label="Monthly ad spend"
        onChange={({ value }) => {
          setCurrentValue(value);
        }}
        value={currentValue}
      />
    </Flex>
  );
}
