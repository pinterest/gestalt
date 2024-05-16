import { ReactNode, useEffect, useRef, useState } from 'react';
import { Flex, IconButton, PopoverEducational } from 'gestalt';

export default function Example() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<null | HTMLAnchorElement | HTMLButtonElement>(null);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <IconButton
        ref={anchorRef}
        accessibilityLabel="This IconButton represents a new feature"
        icon="pin"
        iconColor="darkGray"
        onClick={() => {}}
        size="lg"
      />
      {open && (
        <PopoverEducational
          accessibilityLabel="Popover visible on initial page load"
          anchor={anchorRef.current}
          idealDirection="right"
          message="This PopoverEducational is visible on initial page load"
          onDismiss={() => {}}
        />
      )}
    </Flex>
  );
}
