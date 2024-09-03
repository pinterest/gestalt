import { Fragment, useRef, useState } from 'react';
import {
  Avatar,
  Box,
  CompositeZIndex,
  Dropdown,
  FixedZIndex,
  Flex,
  IconButton,
  Text,
} from 'gestalt';

export default function CustomIconButtonPopoverExample() {
  const PAGE_HEADER_ZINDEX = new FixedZIndex(10);

  const [open, setOpen] = useState(false);
  const anchorRef = useRef<null | HTMLAnchorElement | HTMLButtonElement>(null);

  return (
    <Fragment>
      <Flex height="100%" justifyContent="center" width="100%">
        <Box margin={2}>
          <IconButton
            // @ts-expect-error - TS2322 - Type 'MutableRefObject<HTMLAnchorElement | HTMLButtonElement | null>' is not assignable to type 'LegacyRef<HTMLButtonElement> | undefined'.
            ref={anchorRef}
            accessibilityControls="custom-dropdown-example"
            accessibilityExpanded={open}
            accessibilityHaspopup
            accessibilityLabel="More Options"
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
          id="custom-dropdown-example"
          onDismiss={() => setOpen(false)}
          zIndex={new CompositeZIndex([PAGE_HEADER_ZINDEX])}
        >
          <Dropdown.Section label="Currently in">
            <Dropdown.Link
              href="#"
              onClick={({ event }) => event.preventDefault()}
              option={{ value: 'item 1', label: 'Custom link 1' }}
            >
              <Box width="100%">
                <Flex alignItems="center" gap={2}>
                  <Avatar name="Tia" size="md" src="https://i.ibb.co/7tGKGvb/shanice.jpg" />
                  <Flex direction="column">
                    <Text>Tia Marz</Text>
                    <Text color="subtle" size="200">
                      Personal
                    </Text>
                    <Text color="subtle" size="200">
                      travel@theworld.com
                    </Text>
                  </Flex>
                </Flex>
              </Box>
            </Dropdown.Link>
          </Dropdown.Section>
          <Dropdown.Section label="Your accounts">
            <Dropdown.Link
              href="#"
              onClick={({ event }) => event.preventDefault()}
              option={{ value: 'item 2', label: 'Another custom link' }}
            >
              <Box width="100%">
                <Flex alignItems="center" gap={2}>
                  <Avatar name="Bruno" size="md" src="https://i.ibb.co/4Mbhbnb/Bruno.jpg" />
                  <Flex direction="column">
                    <Text>Bruno</Text>
                    <Text color="subtle" size="200">
                      Business
                    </Text>
                  </Flex>
                </Flex>
              </Box>
            </Dropdown.Link>
          </Dropdown.Section>
          <Dropdown.Section label="More options">
            <Dropdown.Link
              href="#"
              onClick={({ event }) => event.preventDefault()}
              option={{ value: 'settings', label: 'Settings' }}
            />
            <Dropdown.Link
              href="#"
              iconEnd="visit"
              onClick={({ event }) => event.preventDefault()}
              option={{ value: 'help', label: 'Get help' }}
            />
          </Dropdown.Section>
        </Dropdown>
      )}
    </Fragment>
  );
}
