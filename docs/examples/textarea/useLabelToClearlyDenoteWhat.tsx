import {ReactNode, useState} from 'react';
import { Box, TextArea } from 'gestalt';

export default function Example() {
  const [value, setValue] = useState('');

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Box width="100%">
        <TextArea
          id="best-practices-do-label"
          label="Tell everyone what this Pin is about"
          onChange={(e) => {
            setValue(e.value);
          }}
          value={value}
        />
      </Box>
    </Box>
  );
}
