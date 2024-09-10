import { useRef, useState } from 'react';
import { Box, ColorSchemeProvider, Dropdown, Flex, IconButton } from 'gestalt';

export default function Snapshot() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<null | HTMLAnchorElement | HTMLButtonElement>(null);

  return (
    <ColorSchemeProvider colorScheme="light">
      <Box color="default" height={250} padding={4} width={300}>
        <Flex justifyContent="center">
          <IconButton
            // @ts-expect-error - TS2322 - Type 'MutableRefObject<HTMLAnchorElement | HTMLButtonElement | null>' is not assignable to type 'LegacyRef<HTMLButtonElement> | undefined'.
            ref={anchorRef}
            accessibilityControls="link-dropdown-example"
            accessibilityExpanded={open}
            accessibilityHaspopup
            accessibilityLabel="More Options"
            icon="arrow-down"
            iconColor="darkGray"
            onClick={() => setOpen((prevVal) => !prevVal)}
            selected={open}
            size="lg"
          />
          {open && (
            <Dropdown
              anchor={anchorRef.current}
              id="link-dropdown-example"
              onDismiss={() => setOpen(false)}
            >
              <Dropdown.Link
                href="https://pinterest.com"
                option={{ value: 'Create new board', label: 'Create new board' }}
              />
              <Dropdown.Link
                href="https://help.pinterest.com/"
                iconEnd="visit"
                onClick={() => {}}
                option={{ value: 'Get help', label: 'Get help' }}
              />
              <Dropdown.Link
                href="https://policy.pinterest.com"
                iconEnd="visit"
                option={{ value: 'See terms and privacy', label: 'See terms and privacy' }}
              />
            </Dropdown>
          )}
        </Flex>
      </Box>
    </ColorSchemeProvider>
  );
}
