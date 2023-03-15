// @flow strict
import { type Node, useState } from 'react';
import { Checkbox, Fieldset, Flex } from 'gestalt';

export default function Example(): Node {
  const [checkedEn, setCheckedEn] = useState(false);
  const [checkedSp, setCheckedSp] = useState(false);
  const [checkedPo, setCheckedPo] = useState(false);

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Fieldset
        legend="What languages would you like to learn?"
        id="fieldset-error-message"
        errorMessage="At least 1 item must be selected"
      >
        <Flex direction="column" gap={2}>
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
            helperText="Mexico, Columbia, and Spain are the top three Spanish-speaking countries"
            name="languages"
            onChange={({ checked }) => {
              setCheckedSp(checked);
            }}
          />
          <Checkbox
            checked={checkedPo}
            id="portuguese-info"
            label="Portuguese"
            helperText="Brazil, Angola, and Mozambique are the top three Portuguese-speaking countries"
            name="languages"
            onChange={({ checked }) => {
              setCheckedPo(checked);
            }}
          />
        </Flex>
      </Fieldset>
    </Flex>
  );
}
