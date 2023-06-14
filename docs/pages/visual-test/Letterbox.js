// @flow strict
import { type Node } from 'react';
import { Box, ColorSchemeProvider, Flex, Image, Letterbox } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="light">
      <Box color="default" display="inlineBlock" padding={1}>
        <Flex>
          {[50, 75, 100, 125].map((a) => (
            <Letterbox key={a} width={100} height={a} contentAspectRatio={564 / 806}>
              <Image
                alt="tall"
                src="https://i.ibb.co/jVR29XV/stock5.jpg"
                naturalWidth={564}
                naturalHeight={806}
              />
            </Letterbox>
          ))}
        </Flex>
      </Box>
    </ColorSchemeProvider>
  );
}
