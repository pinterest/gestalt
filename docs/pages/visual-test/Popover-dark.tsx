import { useRef, useState } from 'react';
import {
  Box,
  ColorSchemeProvider,
  DesignTokensProvider,
  Flex,
  IconButton,
  Popover,
  Text,
} from 'gestalt';

export default function Snapshot() {
  const anchorRef = useRef<null | HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <ColorSchemeProvider colorScheme="dark">
      <DesignTokensProvider>
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
      </DesignTokensProvider>
    </ColorSchemeProvider>
  );
}
