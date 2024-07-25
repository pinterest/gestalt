import { useState } from 'react';
import { Box, Flex, TextField } from 'gestalt';

export default function Example() {
  const [name, setName] = useState({
    first: '',
    middle: '',
    last: '',
  });

  return (
    <Box  height="100%" padding={8} width="100%">
      <Flex direction="column" gap={3} width="100%">
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
