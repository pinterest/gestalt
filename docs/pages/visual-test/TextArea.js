// @flow strict
import { type Node } from 'react';
import { Flex, TextArea, Box } from 'gestalt';

export default function Screenshot(): Node {
  return (
    <Box color="white" display="inlineBlock" padding={1} width={300}>
      <TextArea
        id="aboutmemore"
        onChange={() => {}}
        placeholder="Write something about yourself..."
        helperText="I love to sail, run and visit remote places"
        label="With a placeholder"
      />
    </Box>
  );
}
