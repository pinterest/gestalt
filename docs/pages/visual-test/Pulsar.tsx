import { useRef } from 'react';
import { Box, Button, ColorSchemeProvider, Flex, Pulsar } from 'gestalt';

export default function Snapshot() {
  const anchorRef = useRef<null | HTMLElement>(null);

  return (
    <ColorSchemeProvider colorScheme="light">
      <Box color="default" display="inlineBlock" height={150} padding={1} width={300}>
        <Flex height="100%" justifyContent="center" width="100%">
          <Box dangerouslySetInlineStyle={{ __style: { marginTop: 40 } }} position="relative">
            <Button onClick={() => {}} text="Button" />
            {/* @ts-expect-error - TS2322 - Type 'MutableRefObject<HTMLElement | null>' is not assignable to type 'LegacyRef<HTMLDivElement> | undefined'. */}
            <Box ref={anchorRef} marginStart={-3} marginTop={-7} position="absolute" top>
              <Pulsar size={100} />
            </Box>
          </Box>
        </Flex>
      </Box>
    </ColorSchemeProvider>
  );
}
