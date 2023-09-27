// @flow strict
import { type Node } from 'react';
import { Box, RadioGroup } from 'gestalt';

const noop = () => {};

export default function RadioButtonExample(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <RadioGroup legend="Choose all of your favorite hobbies" id="bestPracticeDont">
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
