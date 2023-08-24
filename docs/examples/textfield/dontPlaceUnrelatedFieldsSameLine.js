// @flow strict
import { type Node, useState } from 'react';
import { Box, Flex, TextField } from 'gestalt';

export default function Example(): Node {
  const [passwordValue, setPasswordValue] = useState('');
  const [zipCodeValue, setZipCodeValue] = useState('');

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex gap={{ column: 0, row: 4 }}>
        <TextField
          autoComplete="new-password"
          id="best-practices-dont-related-password"
          label="Password"
          onChange={({ value }) => {
            setPasswordValue(value);
          }}
          type="password"
          value={passwordValue}
        />
        <TextField
          id="best-practices-dont-related-zip-code"
          label="ZIP Code"
          onChange={({ value }) => {
            setZipCodeValue(value);
          }}
          value={zipCodeValue}
        />
      </Flex>
    </Box>
  );
}
