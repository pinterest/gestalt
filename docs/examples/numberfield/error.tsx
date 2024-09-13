import { useState } from 'react';
import { Box, Flex, NumberField } from 'gestalt';

export default function Example() {
  const [input1text, setInput1Text] = useState<number | undefined>(undefined);
  const [input2text, setInput2Text] = useState<number | undefined>(undefined);
  const [input3text, setInput3Text] = useState<number | undefined>(undefined);

  return (
    <Box padding={8} width="100%">
      <Flex direction="column" gap={6} width="100%">
        <NumberField
          errorMessage={
            input1text === null || input1text === undefined ? 'You must enter a number' : null
          }
          id="error-example-sm"
          label="Number of widgets"
          onChange={({ value }) => setInput1Text(value)}
          placeholder="Please enter the number of widgets"
          size="sm"
          value={input1text}
        />
        <NumberField
          errorMessage={
            input2text === null || input2text === undefined ? 'You must enter a number' : null
          }
          id="error-example-md"
          label="Number of widgets"
          onChange={({ value }) => setInput2Text(value)}
          placeholder="Please enter the number of widgets"
          size="md"
          value={input2text}
        />
        <NumberField
          errorMessage={
            input3text === null || input3text === undefined ? 'You must enter a number' : null
          }
          id="error-example-lg"
          label="Number of widgets"
          onChange={({ value }) => setInput3Text(value)}
          placeholder="Please enter the number of widgets"
          size="lg"
          value={input3text}
        />
      </Flex>
    </Box>
  );
}
