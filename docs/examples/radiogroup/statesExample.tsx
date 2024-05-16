import { ReactNode, useState } from 'react';
import { Box, RadioGroup } from 'gestalt';

export default function RadioButtonExample() {
  const [state, setState] = useState('checked');

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <RadioGroup id="rowExample" legend="Which state is your favorite?">
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
          disabled
          id="uncheckedDisabled"
          label="Unchecked and disabled"
          name="stateExample"
          onChange={() => setState('uncheckedDisabled')}
          value="uncheckedDisabled"
        />
        <RadioGroup.RadioButton
          checked
          disabled
          id="checkedDisabled"
          label="Checked and disabled"
          name="stateExample"
          onChange={() => setState('checkedDisabled')}
          value="checkedDisabled"
        />
      </RadioGroup>
    </Box>
  );
}
