import { useState } from 'react';
import { Box, TextArea } from 'gestalt';

export default function Example() {
    const [input, setInput] =  useState(
    'To keep shopping inspirational and actionable, we set high standards for our Merchants. Your website was not approved due to fuzzy, low quality images.',
  );

  return (
    <Box padding={8} width="100%">
      <TextArea
        id="aboutmereadonly"
        label="Current errors"
          onChange={({ value }) => setInput(value)}
        readOnly
        value={input}
      />
    </Box>
  );
}
