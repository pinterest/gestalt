import { useState } from 'react';
import { Box, Flex, Label, Text, TextArea } from 'gestalt';

export default function Example() {
  const [input, setInput] = useState('');

  return (
    <Box padding={8} width="100%">
      <Flex direction="column" gap={2} width="100%">
        <Label htmlFor="textareaExternalLabel">
          <Text size="300" weight="bold">
            About me
          </Text>
        </Label>
        <TextArea
          id="textareaExternalLabel"
          label="About me"
          labelDisplay="hidden"
          onChange={({ value }) => setInput(value)}
          placeholder="Write something about yourself..."
          value={input}
        />
      </Flex>
    </Box>
  );
}
