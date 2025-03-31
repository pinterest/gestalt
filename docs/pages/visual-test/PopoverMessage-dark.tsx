import { useRef, useState } from 'react';
import {
  Box,
  ColorSchemeProvider,
  DesignTokensProvider,
  Flex,
  IconButton,
  PopoverMessage,
} from 'gestalt';

export default function Snapshot() {
  const anchorRef = useRef<null | HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <ColorSchemeProvider colorScheme="dark">
      <DesignTokensProvider>
        <Box color="default" display="inlineBlock" height={200} padding={1} width={300}>
          <Flex justifyContent="center" width="100%">
            <IconButton
              ref={anchorRef}
              accessibilityLabel="test"
              icon="filter"
              iconColor="darkGray"
              onClick={() => setOpen(true)}
              size="lg"
            />
          </Flex>
          {open && (
            <PopoverMessage
              accessibilityLabel="Popover"
              anchor={anchorRef.current}
              message="Message"
              onDismiss={() => {}}
              primaryAction={{ text: 'Next', role: 'button' }}
            />
          )}
        </Box>
      </DesignTokensProvider>
    </ColorSchemeProvider>
  );
}
