// @flow strict
import { type Node, useState } from 'react';
import { Box, RadioGroup } from 'gestalt';

export default function RadioButtonExample(): Node {
  const [state, setState] = useState('checked');

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <RadioGroup legend="Which state is your favorite?" id="rowExample">
        <RadioGroup.RadioButton
          checked={false}
          id="unchecked"
          label="Unchecked"
          name="stateExample"
          onChange={() => setState('unchecked')}
          value="unchecked"
        />
        <RadioGroup.RadioButton
          checked={state === 'checked'}
          id="checked"
          label="Checked"
          name="stateExample"
          onChange={() => setState('checked')}
          value="checked"
        />
        <RadioGroup.RadioButton
          checked={false}
          id="uncheckedDisabled"
          label="Unchecked and disabled"
          name="stateExample"
          onChange={() => setState('uncheckedDisabled')}
          value="uncheckedDisabled"
          disabled
        />
        <RadioGroup.RadioButton
          checked
          id="checkedDisabled"
          label="Checked and disabled"
          name="stateExample"
          onChange={() => setState('checkedDisabled')}
          value="checkedDisabled"
          disabled
        />
      </RadioGroup>
    </Box>
  );
}
