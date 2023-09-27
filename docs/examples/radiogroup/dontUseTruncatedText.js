// @flow strict
import { type Node } from 'react';
import { Box, RadioGroup } from 'gestalt';

const noop = () => {};

export default function RadioButtonExample(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <RadioGroup legend="Campaign budget" id="bestPracticeLabelsDont">
        <RadioGroup.RadioButton
          checked={false}
          id="daily-dont"
          label="Daily-Daily spend limit. Choose this option to set a cap for the amount your campaign can spend each day."
          name="spend-dont"
          onChange={noop}
          value="daily"
        />
        <RadioGroup.RadioButton
          checked={false}
          id="lifetime-dont"
          label="Lifetime-Lifetime spend limit. Choose this option to seta a cap for the amount your campaign can spend over the course of its lifetime."
          name="spend-dont"
          onChange={noop}
          value="lifetime"
        />
      </RadioGroup>
    </Box>
  );
}
