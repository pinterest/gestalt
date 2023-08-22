// @flow strict
import { type Node, useState } from 'react';
import { Box, TextArea } from 'gestalt';

export default function Example(): Node {
  const [value, setValue] = useState('');
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Box width="100%">
        <TextArea
          id="aboutmemore"
          onChange={(e) => setValue(e.value)}
          placeholder="Write something about yourself..."
          helperText="Describe your favorite hobbies, foods, or books."
          label="About me"
          value={value}
        />
      </Box>
    </Box>
  );
}
