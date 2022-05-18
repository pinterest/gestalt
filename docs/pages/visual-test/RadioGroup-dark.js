// @flow strict
import { type Node } from 'react';
import { RadioGroup, RadioButton, ColorSchemeProvider } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <RadioGroup legend="testing" id="testing-example">
        <RadioButton id="choice-1" onChange={() => {}} name="choice" value="choice-1" />
      </RadioGroup>
    </ColorSchemeProvider>
  );
}
