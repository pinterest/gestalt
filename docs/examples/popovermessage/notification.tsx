import { useEffect, useRef, useState } from 'react';
import { Box, IconButton, PopoverMessage } from 'gestalt';

export default function Example() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Box alignItems='center' display='flex' height="100%" width="100%">
      <IconButton ref={anchorRef} accessibilityLabel="Inbox" bgColor="lightGray" icon="speech" />
      {open && (
        <PopoverMessage
          anchor={anchorRef.current}
          id="popovereducational-notification"
          idealDirection="right"
          message="You have 2 messages!"
          onDismiss={() => {}}
          type="notification"
        />
      )}
    </Box>
  );
}
