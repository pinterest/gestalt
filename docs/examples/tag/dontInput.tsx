import {ReactNode} from 'react';
import { Box, Flex, Tag, TextField } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex direction="column" gap={6}>
        <Box width={400}>
          <TextField id="do-topics" label="Topics" onChange={() => {}} />
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
