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
            helperText="USA, India, and Pakistan have the top number of English speakers "
            id="english-info"
            label="English"
            name="languages"
            onChange={({ checked }) => {
              setCheckedEn(checked);
            }}
          />
          <Checkbox
            checked={checkedSp}
            helperText="Mexico, Colombia, and Spain are the top three Spanish-speaking countries"
            id="spanish-info"
            label="Spanish"
            name="languages"
            onChange={({ checked }) => {
              setCheckedSp(checked);
            }}
          />
          <Checkbox
            checked={checkedCh}
            helperText="Chinese has many varieties, including Cantonese and Mandarin"
            id="chinese-info"
            label="Chinese"
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
