import { useState } from 'react';
import { Box, Checkbox, Fieldset, Flex } from 'gestalt';

export default function Example() {
  const [checkedEn, setCheckedEn] = useState(false);
  const [checkedSp, setCheckedSp] = useState(false);
  const [checkedCh, setCheckedCh] = useState(false);

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Fieldset legend="What languages would you like to learn?">
        <Flex direction="column" gap={{ column: 2, row: 0 }}>
          <Checkbox
            checked={checkedEn}
            id="english"
            label="English"
            name="english"
            onChange={({ checked }) => setCheckedEn(checked)}
          />
          <Checkbox
            checked={checkedSp}
            id="spanish"
            label="Spanish"
            name="spanish"
            onChange={({ checked }) => setCheckedSp(checked)}
          />
          <Checkbox
            checked={checkedCh}
            id="chinese"
            label="Chinese"
            name="chinese"
            onChange={({ checked }) => setCheckedCh(checked)}
          />
        </Flex>
      </Fieldset>
    </Box>
  );
}
