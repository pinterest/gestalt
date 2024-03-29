// @flow strict
import { type Node as ReactNode, useRef, useState } from 'react';
import { Box, Popover, Text, TextField } from 'gestalt';

export default function TextFieldPopoverExample(): ReactNode {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLElement | null>(null);

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Box color="light" padding={2}>
        <TextField
          ref={anchorRef}
          id="variants-refs"
          label="Focus the TextField to show the Popover"
          onBlur={() => {
            setOpen(false);
          }}
          onChange={() => {}}
          onFocus={() => {
            setOpen(true);
          }}
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
