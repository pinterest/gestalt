import { ComponentProps, Fragment, useRef, useState } from 'react';
import { Box, Button, CompositeZIndex, Dropdown, FixedZIndex, Flex, Text, Tooltip } from 'gestalt';

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
            accessibilityControls="tooltips-dropdown-example"
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
          id="tooltips-dropdown-example"
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
          >
            <Box width="100%">
              <Tooltip text="Hides this Pin for this account only">
                <Text>Hide Pin</Text>
              </Tooltip>
            </Box>
          </Dropdown.Item>
          <Dropdown.Link
            href="https://pinterest.com"
            iconEnd="visit"
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
