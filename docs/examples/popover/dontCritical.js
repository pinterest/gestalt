// @flow strict
import { type Node, useEffect, useRef, useState } from 'react';
import { Box, Layer, Popover, Text, TextField } from 'gestalt';

export default function Example(): Node {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<null | HTMLElement>(null);
  const viewRef = useRef<null | HTMLElement>(null);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Box padding={6} display="flex" width="100%" justifyContent="center">
      <Box display="flex" alignItems="center" ref={viewRef} height={200}>
        <TextField id="field" onChange={() => {}} label="Name" value="Cats" ref={anchorRef} />
      </Box>

      {open && (
        <Layer>
          <Popover
            anchor={anchorRef.current}
            color="red"
            idealDirection="forceDown"
            onDismiss={() => {}}
            positionRelativeToAnchor={false}
            size="xs"
          >
            <Box padding={3}>
              <Text color="inverse" align="center">
                You already have a board with that name
              </Text>
            </Box>
          </Popover>
        </Layer>
      )}
    </Box>
  );
}
