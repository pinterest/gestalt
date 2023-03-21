// @flow strict
import { type Node } from 'react';
import { Box, Flex, Image } from 'gestalt';

export default function InvalidElevationExample(): Node {
  return (
    <Flex height="100%" alignItems="center" justifyContent="center">
      <Box width={200} height={305}>
        <Image
          fit="contain"
          naturalWidth={200}
          naturalHeight={350}
          src="https://i.ibb.co/FqM70HS/screen-sample-02.png"
          alt="Example showing an incorrect mobile dark mode on the Pinterest app."
        />
      </Box>
    </Flex>
  );
}
