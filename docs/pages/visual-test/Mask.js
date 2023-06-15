// @flow strict
import { type Node } from 'react';
import { Box, ColorSchemeProvider, Flex, Image, Mask } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="light">
      <Box color="default" display="inlineBlock" maxWidth={308} padding={1}>
        <Flex maxWidth={300} wrap>
          {[0, 2, 4, 6, 8, 'circle'].map((a) => (
            <Box maxWidth={100} key={a}>
              <Mask rounding={a}>
                <Box height={100} width={100}>
                  <Image
                    alt="tall"
                    color="black"
                    naturalHeight={1}
                    naturalWidth={1}
                    src="https://d3cy9zhslanhfa.cloudfront.net/media/BBEEEEC7-E954-4223-B5A061E37D0C03E2/CE43CF95-DE36-465B-956EFB21C9CC9C04/webimage-0311D236-89DC-4404-9D9B1452C865159C.png"
                  />
                </Box>
              </Mask>
            </Box>
          ))}
        </Flex>
      </Box>
    </ColorSchemeProvider>
  );
}
