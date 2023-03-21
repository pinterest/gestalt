// @flow strict
import { type Node, useEffect, useRef, useState } from 'react';
import { Box, Flex, IconButton, Layer, Popover, Text } from 'gestalt';

export default function Example(): Node {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef();

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Flex alignItems="center" justifyContent="center" height="100%" width="100%">
      <IconButton
        accessibilityLabel="Default IconButton"
        iconColor="darkGray"
        icon="pin"
        onClick={() => {}}
        ref={anchorRef}
        size="lg"
      />

      {open && (
        <Layer>
          <Popover
            anchor={anchorRef.current}
            color="blue"
            idealDirection="down"
            showCaret
            onDismiss={() => {}}
            positionRelativeToAnchor={false}
            size="xs"
          >
            <Box padding={3}>
              <Text color="inverse" align="center">
                This Popover is visible on initial page load
              </Text>
            </Box>
          </Popover>
        </Layer>
      )}
    </Flex>
  );
}
