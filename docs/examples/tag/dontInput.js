// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Flex, Tag, TextField } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex alignItems="center" justifyContent="center" height="100%" width="100%">
      <Flex direction="column" gap={6}>
        <Box width={400}>
          <TextField label="Topics" id="do-topics" onChange={() => {}} />
        </Box>

        <Flex gap={2} wrap>
          {['Design systems', 'Color', 'Tokens'].map((item) => (
            <Tag key={item} onRemove={() => {}} text={item} />
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
}
