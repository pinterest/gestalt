// @flow strict
import { type Node, useRef, useState } from 'react';
import { Box, ColorSchemeProvider, Dropdown, Flex, IconButton } from 'gestalt';

export default function Snapshot(): Node {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<null | HTMLAnchorElement | HTMLButtonElement>(null);
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" padding={4} width={300} height={250}>
        <Flex justifyContent="center">
          <IconButton
            accessibilityControls="link-dropdown-example"
            accessibilityExpanded={open}
            accessibilityHaspopup
            accessibilityLabel="More Options"
            icon="arrow-down"
            iconColor="darkGray"
            onClick={() => setOpen((prevVal) => !prevVal)}
            ref={anchorRef}
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
                isExternal
                onClick={() => {}}
                option={{ value: 'Get help', label: 'Get help' }}
              />
              <Dropdown.Link
                href="https://policy.pinterest.com"
                isExternal
                option={{ value: 'See terms and privacy', label: 'See terms and privacy' }}
              />
            </Dropdown>
          )}
        </Flex>
      </Box>
    </ColorSchemeProvider>
  );
}
