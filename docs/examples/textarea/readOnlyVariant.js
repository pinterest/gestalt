// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Box, TextArea } from 'gestalt';

export default function Example(): ReactNode {
  const [value, setValue] = useState(
    'To keep shopping inspirational and actionable, we set high standards for our Merchants. Your website was not approved due to fuzzy, low quality images.',
  );
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Box width="100%">
        <TextArea
          id="aboutmereadonly"
          onChange={(data) => setValue(data.value)}
          label="Current errors"
          value={value}
          readOnly
        />
      </Box>
    </Box>
  );
}
