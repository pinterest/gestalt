// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Checkbox } from 'gestalt';

export default function CheckboxExample(): ReactNode {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Checkbox
        id="error"
        errorMessage="You must agree to the Terms and Conditions"
        label="I agree to the Terms and Conditions"
        name="error"
        onChange={() => {}}
      />
    </Box>
  );
}
