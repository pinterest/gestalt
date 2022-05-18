// @flow strict
import { type Node } from 'react';
import { Box, RadioGroup, ColorSchemeProvider } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="white">
        <RadioGroup legend="testing" id="testing-example">
          <RadioGroup.RadioButton
            id="choice-1"
            onChange={() => {}}
            name="choice"
            value="choice-1"
            label="this is choice 1"
          />
          <RadioGroup.RadioButton
            id="choice-2"
            onChange={() => {}}
            name="choice"
            value="choice-2"
            label="this is choice 2"
          />
        </RadioGroup>
      </Box>
    </ColorSchemeProvider>
  );
}
