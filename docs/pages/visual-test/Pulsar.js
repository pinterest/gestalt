// @flow strict
import { type Node as ReactNode, useRef } from 'react';
import { Box, Button, ColorSchemeProvider, Flex, Pulsar } from 'gestalt';

export default function Snapshot(): ReactNode {
  const anchorRef = useRef<null | HTMLElement>(null);

  return (
    <ColorSchemeProvider colorScheme="light">
      <Box color="default" display="inlineBlock" padding={1} width={300} height={150}>
        <Flex justifyContent="center" height="100%" width="100%">
          <Box dangerouslySetInlineStyle={{ __style: { marginTop: 40 } }} position="relative">
            <Button onClick={() => {}} text="Button" />
            <Box ref={anchorRef} position="absolute" top marginTop={-7} marginStart={-3}>
              <Pulsar size={100} />
            </Box>
          </Box>
        </Flex>
      </Box>
    </ColorSchemeProvider>
  );
}
