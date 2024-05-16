import { ReactNode, useRef } from 'react';
import { Box, Button, ColorSchemeProvider, Flex, Pulsar } from 'gestalt';

export default function Snapshot() {
  const anchorRef = useRef<null | HTMLElement>(null);

  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" display="inlineBlock" height={150} padding={1} width={300}>
        <Flex height="100%" justifyContent="center" width="100%">
          <Box dangerouslySetInlineStyle={{ __style: { marginTop: 40 } }} position="relative">
            <Button onClick={() => {}} text="Button" />
            <Box ref={anchorRef} marginStart={-3} marginTop={-7} position="absolute" top>
              <Pulsar size={100} />
            </Box>
          </Box>
        </Flex>
      </Box>
    </ColorSchemeProvider>
  );
}
