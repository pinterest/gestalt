// @flow strict
import { type Node, useState } from "react";
import { Box, TextArea } from "gestalt";

export default function Example(props) {
  const [value, setValue] = useState('');

  return (
    <Box
      padding={8}
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"><Box width="100%">
        <TextArea
          id="best-practices-do-label"
          label="Tell everyone what this Pin is about"
          onChange={({ value }) => {
            setValue(value);
          }}
          value={value}
        />
      </Box></Box>
  );
}
