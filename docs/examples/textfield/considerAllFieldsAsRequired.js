// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Box, Flex, TextField } from 'gestalt';

export default function Example(): ReactNode {
  const [name, setName] = useState({
    first: '',
    middle: '',
    last: '',
  });

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex direction="column" gap={{ column: 3, row: 0 }}>
        <TextField
          id="best-practices-do-required-firstName"
          label="First name"
          onChange={({ value }) => {
            setName((nameFields) => ({ ...nameFields, first: value }));
          }}
          type="text"
          value={name.first}
        />
        <TextField
          id="best-practices-do-required-middleName"
          label="Middle name (optional)"
          onChange={({ value }) => {
            setName((nameFields) => ({ ...nameFields, middle: value }));
          }}
          type="text"
          value={name.middle}
        />
        <TextField
          id="best-practices-do-required-lastName"
          label="Last name"
          onChange={({ value }) => {
            setName((nameFields) => ({ ...nameFields, last: value }));
          }}
          type="text"
          value={name.last}
        />
      </Flex>
    </Box>
  );
}
