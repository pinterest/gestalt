import { useRef, useState } from 'react';
import { Box, ColorSchemeProvider, Flex, IconButton, PopoverMessage } from 'gestalt';

export default function Snapshot() {
  const anchorRef = useRef<null | HTMLAnchorElement | HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <ColorSchemeProvider colorScheme="light">
      <Box color="default" display="inlineBlock" height={200} padding={1} width={300}>
        <Flex justifyContent="center" width="100%">
          <IconButton
            // @ts-expect-error - TS2322 - Type 'MutableRefObject<HTMLAnchorElement | HTMLButtonElement | null>' is not assignable to type 'LegacyRef<HTMLButtonElement> | undefined'.
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
    </ColorSchemeProvider>
  );
}
