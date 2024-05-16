import { ReactNode, useState } from 'react';
import { Checkbox, Flex } from 'gestalt';

export default function Example() {
  const [checked1, setChecked1] = useState(false);

  return (
    <Flex alignItems="center" gap={4} height="100%" justifyContent="center" width="100%">
      <Checkbox
        checked={checked1}
        helperText="Nothing will happen if you disagree"
        id="checkbox"
        label="I agree that this is a checkbox"
        onChange={({ checked }) => setChecked1(checked)}
      />
    </Flex>
  );
}
