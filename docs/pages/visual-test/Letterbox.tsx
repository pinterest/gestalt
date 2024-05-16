import { ReactNode } from 'react';
import { Box, ColorSchemeProvider, Flex, Image, Letterbox } from 'gestalt';

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="light">
      <Box color="default" display="inlineBlock" padding={1}>
        <Flex>
          {[50, 75, 100, 125].map((a) => (
            <Letterbox key={a} contentAspectRatio={564 / 806} height={a} width={100}>
              <Image
                alt="tall"
                naturalHeight={806}
                naturalWidth={564}
                src="https://i.ibb.co/jVR29XV/stock5.jpg"
              />
            </Letterbox>
          ))}
        </Flex>
      </Box>
    </ColorSchemeProvider>
  );
}
