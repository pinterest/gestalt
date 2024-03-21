// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Flex, Text, TextArea } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex direction="column" gap={{ column: 2, row: 0 }} width="100%">
        <Text size="300" weight="bold">
          About me
        </Text>
        <TextArea
          id="textareaexampleHiddenLabel"
          label="About me"
          labelDisplay="hidden"
          onChange={() => {}}
          placeholder="Write something about yourself..."
        />
      </Flex>
    </Box>
  );
}
