import { ReactNode, useState } from 'react';
import { Box, TextArea } from 'gestalt';

export default function Example() {
  const [value, setValue] = useState('');

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Box width="100%">
        <TextArea
          helperText="This text will be read aloud by screen readers"
          id="best-practices-do-helpertext"
          label="Explain what people can see in this Pin"
          onChange={(e) => {
            setValue(e.value);
          }}
          value={value}
        />
      </Box>
    </Box>
  );
}
