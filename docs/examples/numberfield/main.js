// @flow strict
import { useState } from 'react';
import { Box, NumberField } from 'gestalt';

export default function Example(): React$Node {
  const [currentValue, setCurrentValue] = useState();

  return (
    <Box width="100%" height="100%" padding={4}>
      <NumberField
        id="header-example"
        label="Number of widgets"
        onChange={({ value }) => {
          setCurrentValue(value);
        }}
        placeholder="Please enter the number of widgets"
        value={currentValue}
      />
    </Box>
  );
}
