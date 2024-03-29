// @flow strict
import { type Node as ReactNode, useEffect, useRef, useState } from 'react';
import { Box, Flex, IconButton, Layer, Popover, Text } from 'gestalt';

export default function Example(): ReactNode {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<null | HTMLButtonElement | HTMLAnchorElement>(null);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <IconButton
        ref={anchorRef}
        accessibilityLabel="Default IconButton"
        icon="pin"
        iconColor="darkGray"
        onClick={() => {}}
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
              alignItems="center"
              display="flex"
              height={100}
              justifyContent="center"
              width={300}
            >
              <Text align="center">Content</Text>
            </Box>
          </Popover>
        </Layer>
      )}
    </Flex>
  );
}
