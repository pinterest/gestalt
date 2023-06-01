// @flow strict
import { Fragment, type Node, useState, useRef } from 'react';
import { Box, Button, Dropdown, Flex, FixedZIndex, CompositeZIndex } from 'gestalt';

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
            accessibilityControls="action-variant-dropdown-example"
            accessibilityExpanded={open}
            accessibilityHaspopup
            iconEnd="arrow-down"
            onClick={() => setOpen((prevVal) => !prevVal)}
            ref={anchorRef}
            selected={open}
            size="lg"
            text={selected ? selected.label : 'Display'}
          />
        </Box>
      </Flex>

      {open && (
        <Dropdown
          anchor={anchorRef.current}
          id="action-variant-dropdown-example"
          onDismiss={() => setOpen(false)}
          zIndex={new CompositeZIndex([PAGE_HEADER_ZINDEX])}
        >
          <Dropdown.Item
            onSelect={onSelect}
            option={{ value: 'Cozy', label: 'Cozy' }}
            selected={selected}
          />
          <Dropdown.Item
            onSelect={onSelect}
            option={{ value: 'Comfy', label: 'Comfy' }}
            selected={selected}
          />
        </Dropdown>
      )}
    </Fragment>
  );
}
