import {ReactNode, useState} from 'react';
import { Box, Checkbox, Fieldset, Flex } from 'gestalt';

export default function Example() {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Fieldset legend="Select what you enjoy">
        <Flex direction="column" gap={{ column: 2, row: 0 }}>
          <Checkbox
            checked={checked1}
            id="Fashion"
            label="Fashion"
            onChange={({ checked }) => setChecked1(checked)}
          />
          <Checkbox
            checked={checked2}
            id="Beauty"
            label="Beauty"
            onChange={({ checked }) => setChecked2(checked)}
          />
          <Checkbox
            checked={checked3}
            id="Interior_design"
            label="Interior design"
            onChange={({ checked }) => setChecked3(checked)}
          />
          <Checkbox
            checked={checked4}
            id="Other"
            label="Other"
            onChange={({ checked }) => setChecked4(checked)}
          />
        </Flex>
      </Fieldset>
    </Box>
  );
}
