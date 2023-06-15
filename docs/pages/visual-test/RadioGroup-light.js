// @flow strict
import { type Node } from 'react';
import { Box, ColorSchemeProvider, RadioGroup } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="light">
      <Box color="default" display="inlineBlock" padding={1}>
        <RadioGroup legend="Favorite pet" id="testing-example">
          <RadioGroup.RadioButton
            id="choice-1"
            onChange={() => {}}
            name="choice"
            value="dogs"
            label="Dogs"
          />
          <RadioGroup.RadioButton
            id="choice-2"
            onChange={() => {}}
            name="choice"
            value="cats"
            label="Cats"
          />{' '}
        </RadioGroup>
      </Box>
    </ColorSchemeProvider>
  );
}
