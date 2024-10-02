import { useState } from 'react';
import { Box, Flex, NumberField } from 'gestalt';

export default function Example() {
  const [input1text, setInput1Text] = useState<number | undefined>(0);
  const [input2text, setInput2Text] = useState<number | undefined>(0);
  const [input3text, setInput3Text] = useState<number | undefined>(0);

  return (
    <Box padding={8} width="100%">
      <Flex direction="column" gap={6} width="100%">
        <NumberField
          id="readOnly-example-sm"
          label="Number of widgets"
          onChange={({ value }) => setInput1Text(value)}
          placeholder="Please enter the number of widgets"
          readOnly
          size="sm"
          value={input1text}
        />
        <NumberField
          id="readOnly-example-md"
          label="Number of widgets"
          onChange={({ value }) => setInput2Text(value)}
          placeholder="Please enter the number of widgets"
          readOnly
          size="md"
          value={input2text}
        />
        <NumberField
          id="readOnly-example-lg"
          label="Number of widgets"
          onChange={({ value }) => setInput3Text(value)}
          placeholder="Please enter the number of widgets"
          readOnly
          size="lg"
          value={input3text}
        />
      </Flex>
    </Box>
  );
}
