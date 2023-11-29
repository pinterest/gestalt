// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Flex, NumberField } from 'gestalt';

export default function Example(): ReactNode {
  const [currentValue, setCurrentValue] = useState<void | number>(undefined);

  return (
    <Flex alignItems="center" justifyContent="center" height="100%" width="100%">
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
