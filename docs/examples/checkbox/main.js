// @flow strict
import { type Node, useState } from 'react';
import { Checkbox, Flex } from 'gestalt';

export default function Example(): Node {
  const [checked1, setChecked1] = useState(false);

  return (
    <Flex alignItems="center" gap={4} height="100%" justifyContent="center" width="100%">
      <Checkbox
        checked={checked1}
        id="checkbox"
        label="I agree that this is a checkbox"
        onChange={({ checked }) => setChecked1(checked)}
        helperText="Nothing will happen if you disagree"
      />
    </Flex>
  );
}
