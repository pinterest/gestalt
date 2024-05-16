import { Fragment, ReactNode, useRef, useState } from 'react';
import { Box, CompositeZIndex, Dropdown, FixedZIndex, Flex, IconButton } from 'gestalt';

export default function CustomIconButtonPopoverExample() {
  const PAGE_HEADER_ZINDEX = new FixedZIndex(10);

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<null | {
    label: string;
    subtext?: string;
    value: string;
  }>(null);
  const anchorRef = useRef<null | HTMLAnchorElement | HTMLButtonElement>(null);

  const onSelect: ComponentProps<typeof Dropdown.Item>['onSelect'] = ({ item }) =>
    setSelected(item);

  return (
    <Fragment>
      <Flex height="100%" justifyContent="center" width="100%">
        <Box margin={2}>
          <IconButton
// @ts-expect-error - TS2322 - Type 'MutableRefObject<HTMLAnchorElement | HTMLButtonElement | null>' is not assignable to type 'LegacyRef<HTMLButtonElement> | undefined'.
            ref={anchorRef}
            accessibilityControls="selectlist-dropdown-example3"
            accessibilityExpanded={open}
            accessibilityHaspopup
            accessibilityLabel="Menu"
            bgColor="lightGray"
            icon="ellipsis"
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
          id="selectlist-dropdown-example3"
          onDismiss={() => setOpen(false)}
          zIndex={new CompositeZIndex([PAGE_HEADER_ZINDEX])}
        >
          <Dropdown.Item
            onSelect={onSelect}
            option={{ value: 'Download image', label: 'Download image' }}
// @ts-expect-error - TS2322 - Type '{ label: string; subtext?: string | undefined; value: string; } | null' is not assignable to type 'DropdownOption | readonly DropdownOption[] | undefined'.
            selected={selected}
          />
          <Dropdown.Item
            badge={{ text: 'New' }}
            onSelect={onSelect}
            option={{ value: 'Hide Pin', label: 'Hide Pin' }}
// @ts-expect-error - TS2322 - Type '{ label: string; subtext?: string | undefined; value: string; } | null' is not assignable to type 'DropdownOption | readonly DropdownOption[] | undefined'.
            selected={selected}
          />
          <Dropdown.Link
            href="https://pinterest.com"
            isExternal
            onClick={({ event }) => event.preventDefault()}
            option={{ value: 'Report Pin', label: 'Report Pin' }}
          />
          <Dropdown.Item
            onSelect={onSelect}
            option={{ value: 'Delete Pin', label: 'Delete Pin' }}
// @ts-expect-error - TS2322 - Type '{ label: string; subtext?: string | undefined; value: string; } | null' is not assignable to type 'DropdownOption | readonly DropdownOption[] | undefined'.
            selected={selected}
          />
        </Dropdown>
      )}
    </Fragment>
  );
}
