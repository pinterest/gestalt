import { ReactNode, useState } from 'react';
import { Box, TextArea } from 'gestalt';

export default function Example() {
  const [value, setValue] = useState(
    'To keep shopping inspirational and actionable, we set high standards for our Merchants. Your website was not approved due to fuzzy, low quality images.',
  );
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Box width="100%">
        <TextArea
          id="aboutmereadonly"
          label="Current errors"
          onChange={(data) => setValue(data.value)}
          readOnly
          value={value}
        />
      </Box>
    </Box>
  );
}
