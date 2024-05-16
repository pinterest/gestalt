import {ReactNode} from 'react';
import { Box, RadioGroup } from 'gestalt';

const noop = () => {};

export default function RadioButtonExample() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <RadioGroup id="bestPracticeDont" legend="Choose all of your favorite hobbies">
        <RadioGroup.RadioButton
          checked={false}
          id="knitting-dont"
          label="Knitting"
          name="hobby-dont"
          onChange={noop}
          value="knitting"
        />
        <RadioGroup.RadioButton
          checked={false}
          id="reading-dont"
          label="Reading"
          name="hobby-dont"
          onChange={noop}
          value="reading"
        />
        <RadioGroup.RadioButton
          checked={false}
          id="pottery-dont"
          label="Pottery"
          name="hobby-dont"
          onChange={noop}
          value="pottery"
        />
      </RadioGroup>
    </Box>
  );
}
