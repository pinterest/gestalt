import {ReactNode} from 'react';
import { Box, ColorSchemeProvider, RadioGroup } from 'gestalt';

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" display="inlineBlock" padding={1}>
        <RadioGroup id="testing-example" legend="Favorite pet">
          <RadioGroup.RadioButton
            id="choice-1"
            label="Dogs"
            name="choice"
            onChange={() => {}}
            value="dogs"
          />
          <RadioGroup.RadioButton
            id="choice-2"
            label="Cats"
            name="choice"
            onChange={() => {}}
            value="Cats"
          />
        </RadioGroup>
      </Box>
    </ColorSchemeProvider>
  );
}
