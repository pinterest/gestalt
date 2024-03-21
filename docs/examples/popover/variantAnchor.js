// @flow strict
import { type Node as ReactNode, useEffect, useRef, useState } from 'react';
import { Box, Button, Flex, Layer, Popover, Text } from 'gestalt';

export default function Example(): ReactNode {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<null | HTMLButtonElement | HTMLAnchorElement>(null);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Flex height="100%" width="100%">
      <Box alignItems="start" display="flex" justifyContent="center" padding={2} width="100%">
        <Button
          ref={anchorRef}
          color="red"
          onClick={() => setOpen((value) => !value)}
          size="lg"
          text="Save"
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
              alignItems="center"
              display="flex"
              height={200}
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
