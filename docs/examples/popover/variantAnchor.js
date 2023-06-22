// @flow strict
import { type Node, useEffect, useRef, useState } from 'react';
import { Box, Button, Flex, Layer, Popover, Text } from 'gestalt';

export default function Example(): Node {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<null | HTMLButtonElement | HTMLAnchorElement>(null);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Flex height="100%" width="100%">
      <Box width="100%" display="flex" alignItems="start" justifyContent="center" padding={2}>
        <Button
          color="red"
          size="lg"
          text="Save"
          ref={anchorRef}
          onClick={() => setOpen((value) => !value)}
        />
      </Box>
      {open && (
        <Layer>
          <Popover
            anchor={anchorRef.current}
            idealDirection="down"
            onDismiss={() => {}}
            positionRelativeToAnchor
            size={240}
          >
            <Box
              height={200}
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
