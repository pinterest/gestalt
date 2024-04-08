// @flow strict
import { type Node as ReactNode, useRef, useState } from 'react';
import { Box, ColorSchemeProvider, Flex, IconButton, Popover, Text } from 'gestalt';

export default function Snapshot(): ReactNode {
  const anchorRef = useRef<null | HTMLAnchorElement | HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" display="inlineBlock" height={150} padding={1} width={300}>
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
          <Popover
            anchor={anchorRef.current}
            idealDirection="down"
            onDismiss={() => {}}
            positionRelativeToAnchor
            size="xs"
          >
            <Box padding={3}>
              <Text align="center" color="light">
                Children
              </Text>
            </Box>
          </Popover>
        )}
      </Box>
    </ColorSchemeProvider>
  );
}
