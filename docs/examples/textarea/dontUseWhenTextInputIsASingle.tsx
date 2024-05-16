import { ReactNode, useState } from 'react';
import { Box, TextArea } from 'gestalt';

export default function Example() {
  const [value, setValue] = useState('https://www.pinterest.com/pin/768145280205600341/');

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
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
