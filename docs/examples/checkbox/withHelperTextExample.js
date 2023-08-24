// @flow strict
import { type Node, useState } from 'react';
import { Box, Checkbox, Fieldset, Flex } from 'gestalt';

export default function Example(): Node {
  const [checkedEn, setCheckedEn] = useState(false);
  const [checkedSp, setCheckedSp] = useState(false);
  const [checkedCh, setCheckedCh] = useState(false);

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Fieldset legend="What languages would you like to learn?">
        <Flex direction="column" gap={{ column: 2, row: 0 }}>
          <Checkbox
            checked={checkedEn}
            id="english-info"
            label="English"
            helperText="USA, India, and Pakistan have the top number of English speakers "
            name="languages"
            onChange={({ checked }) => {
              setCheckedEn(checked);
            }}
          />
          <Checkbox
            checked={checkedSp}
            id="spanish-info"
            label="Spanish"
            helperText="Mexico, Colombia, and Spain are the top three Spanish-speaking countries"
            name="languages"
            onChange={({ checked }) => {
              setCheckedSp(checked);
            }}
          />
          <Checkbox
            checked={checkedCh}
            id="chinese-info"
            label="Chinese"
            helperText="Chinese has many varieties, including Cantonese and Mandarin"
            name="languages"
            onChange={({ checked }) => {
              setCheckedCh(checked);
            }}
          />
        </Flex>
      </Fieldset>
    </Box>
  );
}
