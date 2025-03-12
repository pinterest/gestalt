import { useEffect, useRef, useState } from 'react';
import { Flex, IconButton, PopoverMessage } from 'gestalt';

export default function Example() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<null | HTMLAnchorElement | HTMLButtonElement>(null);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <IconButton
        // @ts-expect-error - TS2322 - Type 'MutableRefObject<HTMLAnchorElement | HTMLButtonElement | null>' is not assignable to type 'LegacyRef<HTMLButtonElement> | undefined'.
        ref={anchorRef}
        accessibilityLabel="This IconButton represents a new feature"
        icon="pin"
        iconColor="darkGray"
        onClick={() => {}}
        size="lg"
      />
      {open && (
        <PopoverMessage
          accessibilityLabel="Popover visible on initial page load"
          anchor={anchorRef.current}
          idealDirection="right"
          message="This PopoverMessage is visible on initial page load"
          onDismiss={() => {}}
        />
      )}
    </Flex>
  );
}
