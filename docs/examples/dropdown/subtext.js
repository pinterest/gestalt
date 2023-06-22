// @flow strict
import { Fragment, type Node, useRef, useState } from 'react';
import { Box, CompositeZIndex, Dropdown, FixedZIndex, Flex, IconButton } from 'gestalt';

export default function CustomIconButtonPopoverExample(): Node {
  const PAGE_HEADER_ZINDEX = new FixedZIndex(10);

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<null | {|
    label: string,
    subtext?: string,
    value: string,
  |}>(null);
  const anchorRef = useRef<null | HTMLElement>(null);
  const onSelect: $ElementType<React$ElementConfig<typeof Dropdown.Item>, 'onSelect'> = ({
    item,
  }) => setSelected(item);

  return (
    <Fragment>
      <Flex justifyContent="center" width="100%" height="100%">
        <Box margin={2}>
          <IconButton
            accessibilityControls="subtext-dropdown-example"
            accessibilityExpanded={open}
            accessibilityHaspopup
            accessibilityLabel="More Options"
            icon="arrow-down"
            iconColor="darkGray"
            onClick={() => setOpen((prevVal) => !prevVal)}
            ref={anchorRef}
            selected={open}
            size="lg"
          />
        </Box>
      </Flex>
      {open && (
        <Dropdown
          anchor={anchorRef.current}
          id="subtext-dropdown-example"
          onDismiss={() => setOpen(false)}
          zIndex={new CompositeZIndex([PAGE_HEADER_ZINDEX])}
        >
          <Dropdown.Section label="Accounts">
            <Dropdown.Item
              onSelect={onSelect}
              option={{
                value: 'Pepper the Pupper',
                label: 'Pepper the Pupper',
                subtext: 'pepper@thepupper.com',
              }}
              selected={selected}
            />
            <Dropdown.Item
              onSelect={onSelect}
              option={{
                value: 'Mizu the Kitty',
                label: 'Mizu the Kitty',
                subtext: 'mizu@thekitty.com',
              }}
              selected={selected}
            />
          </Dropdown.Section>
          <Dropdown.Section label="More options">
            <Dropdown.Item
              onSelect={onSelect}
              option={{ value: 'Tune your home feed', label: 'Tune your home feed' }}
              selected={selected}
            />
            <Dropdown.Link
              href="https://pinterest.com"
              isExternal
              option={{ value: 'Get help', label: 'Get help' }}
              onClick={({ event }) => event.preventDefault()}
            />
          </Dropdown.Section>
        </Dropdown>
      )}
    </Fragment>
  );
}
