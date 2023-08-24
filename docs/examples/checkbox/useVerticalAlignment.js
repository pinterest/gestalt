// @flow strict
import { type Node, useState } from 'react';
import { Box, Checkbox, Fieldset, Flex } from 'gestalt';

export default function Example(): Node {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Fieldset legend="Data personalization">
        <Flex direction="column" gap={{ column: 2, row: 0 }}>
          <Checkbox
            checked={checked1}
            id="sites"
            label="Use sites you visit to improve which recommendations and ads you see on Pinterest"
            onChange={({ checked }) => setChecked1(checked)}
          />
          <Checkbox
            checked={checked2}
            id="partner"
            label="Use partner info to improve which recommendations and ads you see on Pinterest"
            onChange={({ checked }) => setChecked2(checked)}
          />
          <Checkbox
            checked={checked3}
            id="activity"
            label="Use your activity to improve ads you see about Pinterest on other sites or apps you may visit"
            onChange={({ checked }) => setChecked3(checked)}
          />
        </Flex>
      </Fieldset>
    </Box>
  );
}
