// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Flex, Image } from 'gestalt';

export default function InvalidElevationExample(): ReactNode {
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
