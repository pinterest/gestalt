// @flow strict
import { type Node } from 'react';
import { Box, Flex, Image } from 'gestalt';

export default function ValidElevationExample(): Node {
  return (
    <Flex height="100%" alignItems="center" justifyContent="center">
      <Box width={200} height={305}>
        <Image
          fit="contain"
          naturalWidth={200}
          naturalHeight={350}
          src="https://i.ibb.co/5rQQnDR/screen-sample-01.png"
          alt="Example showing mobile dark mode on the Pinterest app."
        />
      </Box>
    </Flex>
  );
}
