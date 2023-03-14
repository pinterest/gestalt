// @flow strict
import { useState, type Node } from 'react';
import { Fieldset, Flex, Box, Checkbox } from 'gestalt';

export default function Example(): Node {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);

  return (
    <Box width="100%" height="100%" padding={4} display="flex" justifyContent="center">
      <Fieldset legend="Pick one topic from the list">
        <Flex direction="column" gap={{ column: 2, row: 0 }}>
          <Checkbox
            checked={checked1}
            id="Fashion2"
            label="Fashion"
            onChange={({ checked }) => setChecked1(checked)}
          />
          <Checkbox
            checked={checked2}
            id="Beauty2"
            label="Beauty"
            onChange={({ checked }) => setChecked2(checked)}
          />
          <Checkbox
            checked={checked3}
            id="Interior_design_3"
            label="Interior design"
            onChange={({ checked }) => setChecked3(checked)}
          />
          <Checkbox
            checked={checked4}
            id="Other4"
            label="Other"
            onChange={({ checked }) => setChecked4(checked)}
          />
        </Flex>
      </Fieldset>
    </Box>
  );
}
