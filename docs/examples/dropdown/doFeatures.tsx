import { ComponentProps, Fragment, useRef, useState } from 'react';
import { Box, Button, CompositeZIndex, Dropdown, FixedZIndex, Flex } from 'gestalt';

export default function CustomIconButtonPopoverExample() {
  const PAGE_HEADER_ZINDEX = new FixedZIndex(10);

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<null | {
    label: string;
    subtext?: string;
    value: string;
  }>(null);
  const anchorRef = useRef<null | HTMLButtonElement>(null);
  const onSelect: ComponentProps<typeof Dropdown.Item>['onSelect'] = ({ item }) =>
    setSelected(item);

  return (
    <Fragment>
      <Flex height="100%" justifyContent="center" width="100%">
        <Box margin={2}>
          <Button
            ref={anchorRef}
            accessibilityControls="selectlist-dropdown-example1"
            accessibilityExpanded={open}
            accessibilityHaspopup
            iconEnd="arrow-down"
            onClick={() => setOpen((prevVal) => !prevVal)}
            selected={open}
            size="lg"
            text="Menu"
          />
        </Box>
      </Flex>
      {open && (
        <Dropdown
          anchor={anchorRef.current}
          id="selectlist-dropdown-example1"
          onDismiss={() => setOpen(false)}
          zIndex={new CompositeZIndex([PAGE_HEADER_ZINDEX])}
        >
          <Dropdown.Item
            onSelect={onSelect}
            option={{ value: 'item 1', label: 'Item 1' }}
            selected={selected}
          />
          <Dropdown.Item
            onSelect={onSelect}
            option={{
              value: 'item 2',
              label: 'Item 2 with a really long, detailed, complex name',
            }}
            selected={selected}
          />
          <Dropdown.Link
            href="#"
            iconEnd="visit"
            onClick={({ event }) => event.preventDefault()}
            option={{
              value: 'item 3',
              label: 'Item 3 with a really long, detailed, complex name',
            }}
          />
          <Dropdown.Item
            badge={{ text: 'New' }}
            onSelect={onSelect}
            option={{ value: 'item 4', label: 'Item 4' }}
            selected={selected}
          />
          <Dropdown.Link
            badge={{ text: 'New' }}
            href="#"
            iconEnd="visit"
            onClick={({ event }) => event.preventDefault()}
            option={{
              value: 'item 5',
              label: 'Item 5 with a really long, detailed name',
            }}
          />
          <Dropdown.Link
            href="#"
            onClick={({ event }) => event.preventDefault()}
            option={{ value: 'item 6', label: 'Item 6 navigates internally' }}
          />
        </Dropdown>
      )}
    </Fragment>
  );
}
