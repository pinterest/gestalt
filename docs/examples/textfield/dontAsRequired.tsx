import { useState } from 'react';
import { Box, Flex, TextField } from 'gestalt';

export default function Example() {
  const [name, setName] = useState({
    first: '',
    middle: '',
    last: '',
  });

  return (
    <Box padding={8} width="100%">
      <Flex direction="column" gap={3} width="100%">
        <TextField
          helperText="* This field is required."
          id="best-practices-dont-required-firstName"
          label="First name"
          onChange={({ value }) => {
            setName((nameFields) => ({ ...nameFields, first: value }));
          }}
          type="text"
          value={name.first}
        />
        <TextField
          id="best-practices-dont-required-middleName"
          label="Middle name"
          onChange={({ value }) => {
            setName((nameFields) => ({ ...nameFields, middle: value }));
          }}
          type="text"
          value={name.middle}
        />
        <TextField
          helperText="* This field is required."
          id="best-practices-dont-required-lastName"
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
