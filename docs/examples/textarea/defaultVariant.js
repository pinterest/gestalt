// @flow strict
import { type Node, useState } from 'react';
import { Box, TextArea } from 'gestalt';

export default function Example(): Node {
  const [value, setValue] = useState('');
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Box width="100%">
        <TextArea
          id="aboutme"
          onChange={(event) => setValue(event.value)}
          placeholder="Write something about yourself..."
          label="About me"
          value={value}
        />
      </Box>
    </Box>
  );
}
