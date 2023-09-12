// @flow strict
import { type Node, useState } from 'react';
import { Box, RadioGroup } from 'gestalt';

export default function Example(): Node {
  const [favorite, setFavorite] = useState<void | string>();

  return (
    <Box
      width="100%"
      height="100%"
      padding={4}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <RadioGroup legend="Gender" id="header-example">
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
