// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Flex, Image, TextField } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex gap={2}>
        <TextField
          id="none"
          label="Numeric virtual keyboard"
          mobileInputMode="numeric"
          onBlur={() => {}}
          onChange={() => {}}
          onFocus={() => {}}
          type="date"
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
