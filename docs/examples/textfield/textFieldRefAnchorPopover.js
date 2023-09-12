// @flow strict
import { type Node, useRef, useState } from 'react';
import { Box, Popover, Text, TextField } from 'gestalt';

export default function TextFieldPopoverExample(): Node {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLElement | null>(null);

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Box padding={2} color="light">
        <TextField
          id="variants-refs"
          label="Focus the TextField to show the Popover"
          onChange={() => {}}
          onBlur={() => {
            setOpen(false);
          }}
          onFocus={() => {
            setOpen(true);
          }}
          ref={anchorRef}
        />
        {open && (
          <Popover
            anchor={anchorRef.current}
            idealDirection="down"
            onDismiss={() => {
              setOpen(false);
            }}
            shouldFocus={false}
            size="md"
          >
            <Box padding={3}>
              <Text weight="bold">Example with Popover</Text>
            </Box>
          </Popover>
        )}
      </Box>
    </Box>
  );
}
