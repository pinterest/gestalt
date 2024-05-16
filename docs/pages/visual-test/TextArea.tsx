import { ReactNode } from 'react';
import { Box, TextArea } from 'gestalt';

export default function Screenshot() {
  return (
    <Box color="default" display="inlineBlock" padding={1} width={300}>
      <TextArea
        helperText="I love to sail, run and visit remote places"
        id="aboutmemore"
        label="With a placeholder"
        onChange={() => {}}
        placeholder="Write something about yourself..."
      />
    </Box>
  );
}
