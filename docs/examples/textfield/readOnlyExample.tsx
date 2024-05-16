import { ReactNode, useState } from 'react';
import { Box, TextField } from 'gestalt';

export default function Example() {
  const [value, setValue] = useState('****maz@pinterest.com');

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <TextField
        id="variants-readonly"
        label="Email address"
        onChange={(e) => setValue(e.value)}
        placeholder="Name"
        // @ts-expect-error - TS2322 - Type '{ id: string; label: string; onChange: (e: { value: string; } & { readonly event: SyntheticEvent<HTMLInputElement, Event>; }) => void; placeholder: string; readOnly: true; value: string; }' is not assignable to type 'IntrinsicAttributes & TextFieldProps & RefAttributes<HTMLInputElement>'.
        readOnly
        value={value}
      />
    </Box>
  );
}
