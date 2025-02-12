import { ComponentProps, Fragment, useRef, useState } from 'react';
import { Box, CompositeZIndex, Dropdown, FixedZIndex, Flex, IconButton } from 'gestalt';

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
          <IconButton
            ref={anchorRef}
            accessibilityControls="sections-dropdown-example"
            accessibilityExpanded={open}
            accessibilityHaspopup
            accessibilityLabel="More Options"
            bgColor="lightGray"
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
          id="sections-dropdown-example"
          onDismiss={() => setOpen(false)}
          zIndex={new CompositeZIndex([PAGE_HEADER_ZINDEX])}
        >
          <Dropdown.Section label="Account management">
            <Dropdown.Item
              onSelect={onSelect}
              option={{ value: 'accounts', label: 'Claimed accounts' }}
              selected={selected}
            />
            <Dropdown.Item
              avatar={{
                name: 'Ayesha',
                src: 'https://i.pinimg.com/originals/c5/5c/ac/c55caca43a7c16766215ec165b649c1c.jpg',
                color: 1,
                size: 'sm',
              }}
              badge={{ text: 'New' }}
              onSelect={onSelect}
              option={{ value: 'pins', label: 'Your Pins' }}
              selected={selected}
            />
          </Dropdown.Section>
          <Dropdown.Section label="User profiles">
            <Dropdown.Item
              avatar={{
                name: 'Ayesha',
                src: 'https://i.pinimg.com/originals/c5/5c/ac/c55caca43a7c16766215ec165b649c1c.jpg',
                color: 1,
                size: 'md',
              }}
              onSelect={onSelect}
              option={{ value: 'user', label: 'Your profile' }}
              selected={selected}
            />
          </Dropdown.Section>
        </Dropdown>
      )}
    </Fragment>
  );
}
