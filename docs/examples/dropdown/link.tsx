import { Fragment, useRef, useState } from 'react';
import { Box, CompositeZIndex, Dropdown, FixedZIndex, Flex, IconButton } from 'gestalt';

export default function CustomIconButtonPopoverExample() {
  const PAGE_HEADER_ZINDEX = new FixedZIndex(10);

  const [open, setOpen] = useState(false);
  const anchorRef = useRef<null | HTMLAnchorElement | HTMLButtonElement>(null);

  return (
    <Fragment>
      <Flex height="100%" justifyContent="center" width="100%">
        <Box margin={2}>
          <IconButton
            // @ts-expect-error - TS2322 - Type 'MutableRefObject<HTMLAnchorElement | HTMLButtonElement | null>' is not assignable to type 'LegacyRef<HTMLButtonElement> | undefined'.
            ref={anchorRef}
            accessibilityControls="link-dropdown-example"
            accessibilityExpanded={open}
            accessibilityHaspopup
            accessibilityLabel="More Options"
            icon="arrow-down"
            iconColor="darkGray"
            onClick={() => setOpen((prevVal) => !prevVal)}
            selected={open}
            size="lg"
          />
        </Box>
      </Flex>

      {open && (
        <Dropdown
          anchor={anchorRef.current}
          id="link-dropdown-example"
          onDismiss={() => setOpen(false)}
          zIndex={new CompositeZIndex([PAGE_HEADER_ZINDEX])}
        >
          <Dropdown.Link
            href="https://pinterest.com"
            onClick={({ event }) => event.preventDefault()}
            option={{ value: 'Create new board', label: 'Create new board' }}
          />
          <Dropdown.Link
            href="https://help.pinterest.com/en?source=gear_menu_web"
            iconEnd="visit"
            onClick={({ event }) => event.preventDefault()}
            option={{ value: 'Get help', label: 'Get help' }}
          />
          <Dropdown.Link
            href="https://policy.pinterest.com/en/privacy-policy"
            iconEnd="visit"
            onClick={({ event }) => event.preventDefault()}
            option={{ value: 'See terms and privacy', label: 'See terms and privacy' }}
          />
        </Dropdown>
      )}
    </Fragment>
  );
}
