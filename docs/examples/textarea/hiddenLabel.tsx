import { useState } from 'react';
import { Avatar, Box, Flex, Text, TextArea } from 'gestalt';

export default function Example() {
  const [input, setInput] = useState('');

  return (
    <Box padding={8} width="100%">
      <Flex direction="column" gap={2} width="100%">
        <Text size="300" weight="bold">
          About me
        </Text>
        <Flex alignItems="center" gap={2} width="100%">
          <Avatar
            accessibilityLabel="Shanice, Verified account"
            name="Shanice"
            size="lg"
            src="https://i.pinimg.com/originals/ab/c5/4a/abc54abd85df131e90ca6b372368b738.jpg"
            verified
          />
          <Text size="300" weight="bold">
            Shanice
          </Text>
        </Flex>
        <TextArea
          id="textareaexampleHiddenLabel"
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
