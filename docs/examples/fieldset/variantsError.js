// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Box, Checkbox, Fieldset, Flex } from 'gestalt';

export default function Example(): ReactNode {
  const [checkedEn, setCheckedEn] = useState(false);
  const [checkedSp, setCheckedSp] = useState(false);
  const [checkedPo, setCheckedPo] = useState(false);

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Box padding={4}>
        <Fieldset
          errorMessage="At least 1 item must be selected"
          id="fieldset-error-message"
          legend="What languages would you like to learn?"
        >
          <Flex direction="column" gap={2}>
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
              helperText="Mexico, Columbia, and Spain are the top three Spanish-speaking countries"
              id="spanish-info"
              label="Spanish"
              name="languages"
              onChange={({ checked }) => {
                setCheckedSp(checked);
              }}
            />
            <Checkbox
              checked={checkedPo}
              helperText="Brazil, Angola, and Mozambique are the top three Portuguese-speaking countries"
              id="portuguese-info"
              label="Portuguese"
              name="languages"
              onChange={({ checked }) => {
                setCheckedPo(checked);
              }}
            />
          </Flex>
        </Fieldset>
      </Box>
    </Flex>
  );
}
