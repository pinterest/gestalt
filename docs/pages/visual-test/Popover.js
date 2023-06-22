// @flow strict
import { type Node, useRef, useState } from 'react';
import { Box, ColorSchemeProvider, Flex, IconButton, Popover, Text } from 'gestalt';

export default function Snapshot(): Node {
  const anchorRef = useRef<null | HTMLAnchorElement | HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <ColorSchemeProvider colorScheme="light">
      <Box color="default" display="inlineBlock" padding={1} width={300} height={150}>
        <Flex width="100%" justifyContent="center">
          <IconButton
            accessibilityLabel="test"
            iconColor="darkGray"
            icon="filter"
            onClick={() => setOpen(true)}
            ref={anchorRef}
            size="lg"
          />
        </Flex>
        {open && (
          <Popover
            anchor={anchorRef.current}
            color="blue"
            idealDirection="down"
            showCaret
            onDismiss={() => {}}
            positionRelativeToAnchor
            size="xs"
          >
            <Box padding={3}>
              <Text color="light" align="center">
                Children
              </Text>
            </Box>
          </Popover>
        )}
      </Box>
    </ColorSchemeProvider>
  );
}
