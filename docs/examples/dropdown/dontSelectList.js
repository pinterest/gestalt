// @flow strict
import { Fragment, type Node, useRef, useState } from 'react';
import { Box, Button, CompositeZIndex, Dropdown, FixedZIndex, Flex } from 'gestalt';

export default function CustomIconButtonPopoverExample(): Node {
  const PAGE_HEADER_ZINDEX = new FixedZIndex(10);

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<null | {|
    label: string,
    subtext?: string,
    value: string,
  |}>(null);
  const anchorRef = useRef<null | HTMLAnchorElement | HTMLButtonElement>(null);

  const onSelect: $ElementType<React$ElementConfig<typeof Dropdown.Item>, 'onSelect'> = ({
    item,
  }) => setSelected(item);

  return (
    <Fragment>
      <Flex justifyContent="center" width="100%" height="100%">
        <Box margin={2}>
          <Button
            accessibilityControls="selectlist-dropdown-example2"
            accessibilityExpanded={open}
            accessibilityHaspopup
            iconEnd="arrow-down"
            onClick={() => setOpen((prevVal) => !prevVal)}
            ref={anchorRef}
            selected={open}
            size="lg"
            text="Menu"
          />
        </Box>
      </Flex>
      {open && (
        <Dropdown
          anchor={anchorRef.current}
          id="selectlist-dropdown-example2"
          onDismiss={() => setOpen(false)}
          zIndex={new CompositeZIndex([PAGE_HEADER_ZINDEX])}
        >
          <Dropdown.Item
            onSelect={onSelect}
            option={{ value: 'item 1', label: 'Last 7 days' }}
            selected={selected}
          />
          <Dropdown.Item
            onSelect={onSelect}
            option={{ value: 'item 2', label: 'Last 14 days' }}
            selected={selected}
          />
          <Dropdown.Item
            onSelect={onSelect}
            option={{ value: 'item 3', label: 'Last 21 days' }}
            selected={selected}
          />
          <Dropdown.Item
            onSelect={onSelect}
            option={{ value: 'item 4', label: 'Last 30 days' }}
            selected={selected}
          />
          <Dropdown.Item
            onSelect={onSelect}
            option={{ value: 'item 5', label: 'Last 60 days' }}
            selected={selected}
          />
          <Dropdown.Item
            onSelect={onSelect}
            option={{ value: 'item 6', label: 'Last 90 days' }}
            selected={selected}
          />
        </Dropdown>
      )}
    </Fragment>
  );
}
