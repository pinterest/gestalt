// @flow strict
import { type Node } from 'react';
import { Box, Flex, Image, TextField } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex gap={2}>
        <TextField
          id="none"
          mobileInputMode="numeric"
          label="Numeric virtual keyboard"
          type="date"
          onChange={() => {}}
          onBlur={() => {}}
          onFocus={() => {}}
        />
        <Box height={100} width={200}>
          <Image
            alt="Image of a screenshot of a virtual keyboard on a mobile screen showing a numeric virtual keyboard"
            naturalHeight={1}
            naturalWidth={1}
            src="https://i.ibb.co/tpZ9pV8/IMG-2519.jpg"
          />
        </Box>
      </Flex>
    </Box>
  );
}
