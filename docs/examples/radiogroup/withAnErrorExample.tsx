import { useState } from 'react';
import { Box, RadioGroup } from 'gestalt';

export default function RadioButtonExample() {
  const [availability, setAvailability] = useState('');

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <RadioGroup
        errorMessage="Please select one"
        id="VariantWithErrorMessage"
        legend="Which time slot works best for you?"
      >
        <RadioGroup.RadioButton
          checked={availability === 'monday'}
          helperText="Morning and afternoon"
          id="mondayError"
          label="Monday"
          name="Availability with error"
          onChange={() => setAvailability('monday')}
          value="monday"
        />
        <RadioGroup.RadioButton
          checked={availability === 'tuesday'}
          helperText="Morning, afternoon, and evening"
          id="tuesdayError"
          label="Tuesday"
          name="Availability with error"
          onChange={() => setAvailability('tuesday')}
          value="tuesday"
        />
        <RadioGroup.RadioButton
          checked={availability === 'wednesday'}
          helperText="Evening only"
          id="WednesdayError"
          label="Wednesday"
          name="Availability with error"
          onChange={() => setAvailability('wednesday')}
          value="wednesday"
        />
      </RadioGroup>
    </Box>
  );
}
