// @flow strict
import { type Node } from 'react';
import { Box, Flex, Image, TextField } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex gap={2}>
        <TextField
          id="decimal"
          mobileInputMode="decimal"
          label="Decimal virtual keyboard"
          onChange={() => {}}
          onBlur={() => {}}
          onFocus={() => {}}
        />
        <Box height={100} width={200}>
          <Image
            alt="Image of a screenshot of a virtual keyboard on a mobile screen showing a decimal virtual keyboard"
            naturalHeight={1}
            naturalWidth={1}
            src="https://i.ibb.co/WxYtCdx/IMG-2520.jpg"
          />
        </Box>
      </Flex>
    </Box>
  );
}
