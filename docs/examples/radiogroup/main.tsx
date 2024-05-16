import { useState } from 'react';
import { Box, RadioGroup } from 'gestalt';

export default function Example() {
  const [favorite, setFavorite] = useState<undefined | string>();

  return (
    <Box
      alignItems="center"
      display="flex"
      height="100%"
      justifyContent="center"
      padding={4}
      width="100%"
    >
      <RadioGroup id="header-example" legend="Gender">
        <RadioGroup.RadioButton
          checked={favorite === 'Female'}
          id="genderFemale"
          label="Female"
          name="gender-pref"
          onChange={() => setFavorite('Female')}
          value="Female"
        />
        <RadioGroup.RadioButton
          checked={favorite === 'Male'}
          id="genderMale"
          label="Male"
          name="gender-pref"
          onChange={() => setFavorite('Male')}
          value="Male"
        />
        <RadioGroup.RadioButton
          checked={favorite === 'Non-binary'}
          id="genderNon-binary"
          label="Non-binary"
          name="gender-pref"
          onChange={() => setFavorite('Non-binary')}
          value="Non-binary"
        />
        <RadioGroup.RadioButton
          checked={favorite === 'Prefer not to state'}
          id="genderPrefer not to state"
          label="Prefer not to state"
          name="gender-pref"
          onChange={() => setFavorite('Prefer not to state')}
          value="Prefer not to state"
        />
      </RadioGroup>
    </Box>
  );
}
