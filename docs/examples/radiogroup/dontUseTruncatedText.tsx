import {ReactNode} from 'react';
import { Box, RadioGroup } from 'gestalt';

const noop = () => {};

export default function RadioButtonExample() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <RadioGroup id="bestPracticeLabelsDont" legend="Campaign budget">
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
