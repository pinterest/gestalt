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
            accessibilityControls="badges-dropdown-example"
            accessibilityExpanded={open}
            accessibilityHaspopup
            accessibilityLabel="More Options"
            icon="add"
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
          id="badges-dropdown-example"
          onDismiss={() => setOpen(false)}
          zIndex={new CompositeZIndex([PAGE_HEADER_ZINDEX])}
        >
          <Dropdown.Section label="Create">
            <Dropdown.Item
              onSelect={onSelect}
              option={{ value: 'Pin', label: 'Pin' }}
// @ts-expect-error - TS2322 - Type '{ label: string; subtext?: string | undefined; value: string; } | null' is not assignable to type 'DropdownOption | readonly DropdownOption[] | undefined'.
              selected={selected}
            />
            <Dropdown.Item
              onSelect={onSelect}
              option={{ value: 'Story Pin', label: 'Story Pin' }}
// @ts-expect-error - TS2322 - Type '{ label: string; subtext?: string | undefined; value: string; } | null' is not assignable to type 'DropdownOption | readonly DropdownOption[] | undefined'.
              selected={selected}
            />
          </Dropdown.Section>
          <Dropdown.Section label="Add">
            <Dropdown.Item
              badge={{ text: 'New' }}
              onSelect={onSelect}
              option={{ value: 'Note', label: 'Note' }}
// @ts-expect-error - TS2322 - Type '{ label: string; subtext?: string | undefined; value: string; } | null' is not assignable to type 'DropdownOption | readonly DropdownOption[] | undefined'.
              selected={selected}
            />
            <Dropdown.Item
              onSelect={onSelect}
              option={{ value: 'Section', label: 'Section' }}
// @ts-expect-error - TS2322 - Type '{ label: string; subtext?: string | undefined; value: string; } | null' is not assignable to type 'DropdownOption | readonly DropdownOption[] | undefined'.
              selected={selected}
            />
          </Dropdown.Section>
        </Dropdown>
      )}
    </Fragment>
  );
}
