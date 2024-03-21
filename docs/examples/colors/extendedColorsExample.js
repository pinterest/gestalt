// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Flex, Image } from 'gestalt';

export default function ExtendedColorsExample(): ReactNode {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center">
      <Box height={305} width={200}>
        <Image
          alt="An example of brand colors used in the Pinterest app."
          naturalHeight={350}
          naturalWidth={200}
          src="https://i.ibb.co/7yLs8qG/Brand.png"
        />
      </Box>
    </Flex>
  );
}
