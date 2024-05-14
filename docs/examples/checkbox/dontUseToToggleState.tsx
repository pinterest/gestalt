import { useState } from 'react';
import { Box, Checkbox } from 'gestalt';

export default function Example() {
  const [checked1, setChecked1] = useState(false);

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Checkbox
        checked={checked1}
        helperText="Change will auto-save"
        id="location"
        label="Turn location tracking off"
        onChange={({ checked }) => setChecked1(checked)}
      />
    </Box>
  );
}
