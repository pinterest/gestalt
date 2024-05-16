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
          // @ts-expect-error - TS2322 - Type '{ id: string; label: string; onChange: (data: { value: string; } & { readonly event: SyntheticEvent<HTMLTextAreaElement, Event>; }) => void; readOnly: true; value: string; }' is not assignable to type 'IntrinsicAttributes & TextAreaProps & RefAttributes<HTMLTextAreaElement>'.
          readOnly
          value={value}
        />
      </Box>
    </Box>
  );
}
