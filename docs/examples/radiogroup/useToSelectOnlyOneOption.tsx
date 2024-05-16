import {ReactNode, useState} from 'react';
import { Box, RadioGroup } from 'gestalt';

export default function RadioButtonExample() {
  const [favorite, setFavorite] = useState('reading');

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <RadioGroup id="bestPracticeDo" legend="If you had to pick one, which hobby would you pick?">
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
