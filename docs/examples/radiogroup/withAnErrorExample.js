// @flow strict
import { type Node, useState } from 'react';
import { Box, RadioGroup } from 'gestalt';

export default function RadioButtonExample(): Node {
  const [availability, setAvailability] = useState('');

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <RadioGroup
        legend="Which time slot works best for you?"
        errorMessage="Please select one"
        id="VariantWithErrorMessage"
      >
        <RadioGroup.RadioButton
          checked={availability === 'monday'}
          id="mondayError"
          label="Monday"
          helperText="Morning and afternoon"
          name="Availability with error"
          onChange={() => setAvailability('monday')}
          value="monday"
        />
        <RadioGroup.RadioButton
          checked={availability === 'tuesday'}
          id="tuesdayError"
          label="Tuesday"
          helperText="Morning, afternoon, and evening"
          name="Availability with error"
          onChange={() => setAvailability('tuesday')}
          value="tuesday"
        />
        <RadioGroup.RadioButton
          checked={availability === 'wednesday'}
          id="WednesdayError"
          label="Wednesday"
          helperText="Evening only"
          name="Availability with error"
          onChange={() => setAvailability('wednesday')}
          value="wednesday"
        />
      </RadioGroup>
    </Box>
  );
}
