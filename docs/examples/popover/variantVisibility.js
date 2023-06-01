// @flow strict
import { type Node, useEffect, useRef, useState } from 'react';
import { Box, Flex, IconButton, Layer, Popover, Text } from 'gestalt';

export default function Example(): Node {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<null | HTMLButtonElement | HTMLAnchorElement>(null);

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
            idealDirection="down"
            onDismiss={() => {}}
            positionRelativeToAnchor={false}
            size="xs"
          >
            <Box
              height={100}
              width={300}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text align="center">Content</Text>
            </Box>
          </Popover>
        </Layer>
      )}
    </Flex>
  );
}
