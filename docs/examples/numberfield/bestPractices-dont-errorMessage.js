// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Flex, NumberField } from 'gestalt';

export default function Example(): ReactNode {
  const [currentValue, setCurrentValue] = useState<void | number>();

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
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
