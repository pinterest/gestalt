// @flow strict
import { type Node, useState } from 'react';
import { Box, RadioGroup } from 'gestalt';

export default function RadioButtonExample(): Node {
  const [favorite, setFavorite] = useState('reading');

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <RadioGroup legend="If you had to pick one, which hobby would you pick?" id="bestPracticeDo">
        <RadioGroup.RadioButton
          checked={favorite === 'knitting'}
          id="knitting"
          label="Knitting"
          name="hobby"
          onChange={() => setFavorite('knitting')}
          value="knitting"
        />
        <RadioGroup.RadioButton
          checked={favorite === 'reading'}
          id="reading"
          label="Reading"
          name="hobby"
          onChange={() => setFavorite('reading')}
          value="reading"
        />
        <RadioGroup.RadioButton
          checked={favorite === 'pottery'}
          id="pottery"
          label="Pottery"
          name="hobby"
          onChange={() => setFavorite('pottery')}
          value="pottery"
        />
      </RadioGroup>
    </Box>
  );
}
