// @flow strict
import { Fragment, type Node as ReactNode, useRef, useState } from 'react';
import { Box, Button, CompositeZIndex, Dropdown, FixedZIndex } from 'gestalt';

export default function CustomIconButtonPopoverExample(): ReactNode {
  const PAGE_HEADER_ZINDEX = new FixedZIndex(10);

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<null | {
    label: string,
    subtext?: string,
    value: string,
  }>(null);
  const anchorRef = useRef<null | HTMLAnchorElement | HTMLButtonElement>(null);

  const onSelect: $ElementType<React$ElementConfig<typeof Dropdown.Item>, 'onSelect'> = ({
    item,
  }) => setSelected(item);

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
            selected={selected}
          />
          <Dropdown.Item
            badge={{ text: 'New' }}
            onSelect={onSelect}
            option={{ value: 'Hide Pin', label: 'Hide Pin' }}
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
            selected={selected}
          />
        </Dropdown>
      )}
    </Fragment>
  );
}
