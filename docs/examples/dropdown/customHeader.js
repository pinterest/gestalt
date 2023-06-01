// @flow strict
import { Fragment, type Node, useState, useRef } from 'react';
import { Link, Box, Button, Dropdown, Flex, Text, FixedZIndex, CompositeZIndex } from 'gestalt';

export default function CustomIconButtonPopoverExample(): Node {
  const PAGE_HEADER_ZINDEX = new FixedZIndex(10);

  const [selected, setSelected] = useState<null | {|
    label: string,
    subtext?: string,
    value: string,
  |}>(null);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<null | HTMLAnchorElement | HTMLButtonElement>(null);
  const onSelect: $ElementType<React$ElementConfig<typeof Dropdown.Item>, 'onSelect'> = ({
    item,
  }) => setSelected(item);

  return (
    <Fragment>
      <Flex justifyContent="center" width="100%" height="100%">
        <Box margin={2}>
          <Button
            accessibilityControls="header-dropdown-example"
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
          zIndex={new CompositeZIndex([PAGE_HEADER_ZINDEX])}
          anchor={anchorRef.current}
          headerContent={
            <Text align="start" size="100">
              This Pin was inspired by your{' '}
              <Text weight="bold" size="100">
                <Link href="https://pinterest.com">recent activity</Link>
              </Text>
            </Text>
          }
          id="header-dropdown-example"
          onDismiss={() => {
            setOpen(false);
          }}
        >
          <Dropdown.Item
            // eslint-disable-next-line no-alert
            onSelect={() => alert('Pin has been hidden')}
            option={{ value: 'item 1', label: 'Hide Pin' }}
            selected={selected}
          />
          <Dropdown.Link
            href="#"
            isExternal
            onClick={({ event }) => event.preventDefault()}
            option={{
              value: 'item 2',
              label: 'Report Pin',
            }}
          />
          <Dropdown.Section label="View options">
            <Dropdown.Item
              badge={{ text: 'New' }}
              onSelect={onSelect}
              option={{ value: 'item 4', label: 'Compact' }}
              selected={selected}
            />
            <Dropdown.Item
              onSelect={onSelect}
              option={{ value: 'item 5', label: 'List' }}
              selected={selected}
            />
          </Dropdown.Section>
        </Dropdown>
      )}
    </Fragment>
  );
}
