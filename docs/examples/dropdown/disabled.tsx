import { Fragment, ReactNode, useRef, useState } from 'react';
import { Box, Button, CompositeZIndex, Dropdown, FixedZIndex } from 'gestalt';

export default function CustomDisabledDropdown() {
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
      <Box display="flex" justifyContent="center" margin={2} width="100%">
        <Button
          ref={anchorRef}
          accessibilityControls="demo-dropdown-example"
          accessibilityExpanded={open}
          accessibilityHaspopup
          iconEnd="arrow-down"
          onClick={() => setOpen((prevVal) => !prevVal)}
          selected={open}
          size="lg"
          text="Menu"
        />
      </Box>
      {open && (
        <Dropdown
          anchor={anchorRef.current}
          id="demo-dropdown-example"
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
            disabled
            onSelect={onSelect}
            option={{ value: 'Hide Pin', label: 'Hide Pin', subtext: `This pin is already hidden` }}
// @ts-expect-error - TS2322 - Type '{ label: string; subtext?: string | undefined; value: string; } | null' is not assignable to type 'DropdownOption | readonly DropdownOption[] | undefined'.
            selected={selected}
          />
          <Dropdown.Link
            disabled
            href="https://pinterest.com"
            isExternal
            onClick={({ event }) => event.preventDefault()}
            option={{
              value: 'Report Pin',
              label: 'Report Pin',
            }}
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
