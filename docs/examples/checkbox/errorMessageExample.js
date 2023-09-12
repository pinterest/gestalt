// @flow strict
import { type Node } from 'react';
import { Box, Checkbox } from 'gestalt';

export default function CheckboxExample(): Node {
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
