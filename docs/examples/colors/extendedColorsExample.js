// @flow strict
import { type Node } from 'react';
import { Box, Flex, Image } from 'gestalt';

export default function ExtendedColorsExample(): Node {
  return (
    <Flex height="100%" alignItems="center" justifyContent="center">
      <Box width={200} height={305}>
        <Image
          naturalWidth={200}
          naturalHeight={350}
          src="https://i.ibb.co/7yLs8qG/Brand.png"
          alt="An example of brand colors used in the Pinterest app."
        />
      </Box>
    </Flex>
  );
}
