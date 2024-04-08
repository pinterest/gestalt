// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Box, TextArea } from 'gestalt';

export default function Example(): ReactNode {
  const [value, setValue] = useState('');
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Box width="100%">
        <TextArea
          errorMessage={!value ? "This field can't be blank!" : null}
          id="witherror"
          label="About me"
          onChange={(e) => setValue(e.value)}
          placeholder="Write something about yourself..."
          value={value}
        />
      </Box>
    </Box>
  );
}
