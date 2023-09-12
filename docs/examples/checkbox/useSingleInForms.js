// @flow strict
import { type Node, useState } from 'react';
import { Box, Button, Checkbox, Flex, TextField } from 'gestalt';

export default function Example(): Node {
  const [checked1, setChecked1] = useState(false);

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex direction="column" gap={{ column: 6, row: 0 }}>
        <TextField id="name" label="Name" onChange={() => {}} value="" />
        <TextField id="email" label="Email" onChange={() => {}} value="" />
        <Checkbox
          checked={checked1}
          id="terms"
          label="I agree to the Terms and Conditions"
          onChange={({ checked }) => setChecked1(checked)}
        />
        <Button accessibilityLabel="Submit" color="red" text="Submit" size="lg" />
      </Flex>
    </Box>
  );
}
