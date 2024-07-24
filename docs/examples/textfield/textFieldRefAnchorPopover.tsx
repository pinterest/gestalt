import { useEffect, useRef, useState } from 'react';
import { Box, PopoverEducational, TextField } from 'gestalt';

export default function TextFieldPopoverExample() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Box color="light" padding={2}>
        <TextField
          // @ts-expect-error - TS2322 - Type 'MutableRefObject<HTMLElement | null>' is not assignable to type 'LegacyRef<HTMLInputElement> | undefined'.
          ref={anchorRef}
          id="variants-refs"
          label="Label"
        />
        {open && (
          <PopoverEducational
            anchor={anchorRef.current}
            idealDirection="up"
            message="Educational message"
            onDismiss={() => {}}
            shouldFocus={false}
          />
        )}
      </Box>
    </Box>
  );
}
