// @flow strict
import { Fragment, type Node, useRef, useState } from 'react';
import { Box, Button, CompositeZIndex, Dropdown, FixedZIndex, Flex, Icon, Text } from 'gestalt';

export default function CustomIconButtonPopoverExample(): Node {
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
      <Flex justifyContent="center" width="100%" height="100%">
        <Box margin={2}>
          <Button
            accessibilityControls="dont-custom-dropdown-example"
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
          id="dont-custom-dropdown-example"
          onDismiss={() => setOpen(false)}
          zIndex={new CompositeZIndex([PAGE_HEADER_ZINDEX])}
        >
          <Dropdown.Item
            onSelect={onSelect}
            option={{ value: 'Settings', label: 'Settings' }}
            selected={selected}
          />
          <Dropdown.Item
            badge={{ text: 'New' }}
            onSelect={onSelect}
            option={{ value: 'Report a bug', label: 'Report a bug' }}
            selected={selected}
          />
          <Dropdown.Link
            href="https://help.pinterest.com/en?source=gear_menu_web"
            isExternal
            option={{ value: 'Get help', label: 'Get help' }}
            onClick={({ event }) => event.preventDefault()}
          >
            <Icon accessibilityLabel="Ad" color="default" icon="ad" />
            <Text>Get help</Text>
          </Dropdown.Link>
          <Dropdown.Link
            href="https://policy.pinterest.com/en/privacy-policy"
            isExternal
            option={{
              value: 'See terms and privacy',
              label: 'See terms and privacy',
            }}
            onClick={({ event }) => event.preventDefault()}
          />
        </Dropdown>
      )}
    </Fragment>
  );
}
