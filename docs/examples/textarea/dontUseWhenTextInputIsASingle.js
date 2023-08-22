// @flow strict
import { type Node, useState } from 'react';
import { Box, TextArea } from 'gestalt';

export default function Example(): Node {
  const [value, setValue] = useState('https://www.pinterest.com/pin/768145280205600341/');

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Box width="100%">
        <TextArea
          id="best-practices-dont-single-line"
          label="Destination URL"
          onChange={(e) => {
            setValue(e.value);
          }}
          value={value}
        />
      </Box>
    </Box>
  );
}
