import { ReactNode, useRef, useState } from 'react';
import { Box, ColorSchemeProvider, Flex, IconButton, PopoverEducational } from 'gestalt';

export default function Snapshot() {
  const anchorRef = useRef<null | HTMLAnchorElement | HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <ColorSchemeProvider colorScheme="dark">
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
          <PopoverEducational
            accessibilityLabel="Popover"
            anchor={anchorRef.current}
            message="Message"
            onDismiss={() => {}}
            primaryAction={{ text: 'Next', role: 'button' }}
          />
        )}
      </Box>
    </ColorSchemeProvider>
  );
}
