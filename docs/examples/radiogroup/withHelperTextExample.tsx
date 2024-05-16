import {ReactNode, useState} from 'react';
import { Box, RadioGroup } from 'gestalt';

export default function RadioButtonExample() {
  const [availability, setAvailability] = useState('');

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <RadioGroup id="helperTextExample" legend="Which time slot works best for you?">
        <RadioGroup.RadioButton
          checked={availability === 'monday'}
          helperText="Morning and afternoon"
          id="monday"
          label="Monday"
          name="Availability"
          onChange={() => setAvailability('monday')}
          value="monday"
        />
        <RadioGroup.RadioButton
          checked={availability === 'tuesday'}
          helperText="Morning, afternoon, and evening"
          id="tuesday"
          label="Tuesday"
          name="Availability"
          onChange={() => setAvailability('tuesday')}
          value="tuesday"
        />
        <RadioGroup.RadioButton
          checked={availability === 'wednesday'}
          helperText="Evening only"
          id="Wednesday"
          label="Wednesday"
          name="Availability"
          onChange={() => setAvailability('wednesday')}
          value="wednesday"
        />
      </RadioGroup>
    </Box>
  );
}
