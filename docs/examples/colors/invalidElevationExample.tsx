import { ReactNode } from 'react';
import { Box, Flex, Image } from 'gestalt';

export default function InvalidElevationExample() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center">
      <Box height={305} width={200}>
        <Image
          alt="Example showing an incorrect mobile dark mode on the Pinterest app."
          fit="contain"
          naturalHeight={350}
          naturalWidth={200}
          src="https://i.ibb.co/FqM70HS/screen-sample-02.png"
        />
      </Box>
    </Flex>
  );
}
