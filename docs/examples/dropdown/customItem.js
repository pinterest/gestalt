// @flow strict
import { Fragment, type Node, useState, useRef } from 'react';
import {
  Avatar,
  Box,
  IconButton,
  Dropdown,
  Flex,
  Text,
  FixedZIndex,
  CompositeZIndex,
} from 'gestalt';

export default function CustomIconButtonPopoverExample(): Node {
  const PAGE_HEADER_ZINDEX = new FixedZIndex(10);

  const [open, setOpen] = useState(false);
  const anchorRef = useRef<null | HTMLAnchorElement | HTMLButtonElement>(null);

  return (
    <Fragment>
      <Flex justifyContent="center" width="100%" height="100%">
        <Box margin={2}>
          <IconButton
            accessibilityControls="custom-dropdown-example"
            accessibilityExpanded={open}
            accessibilityHaspopup
            accessibilityLabel="More Options"
            icon="add"
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
          id="custom-dropdown-example"
          onDismiss={() => setOpen(false)}
          zIndex={new CompositeZIndex([PAGE_HEADER_ZINDEX])}
        >
          <Dropdown.Section label="Currently in">
            <Dropdown.Link
              href="#"
              option={{ value: 'item 1', label: 'Custom link 1' }}
              onClick={({ event }) => event.preventDefault()}
            >
              <Box width="100%">
                <Flex gap={2} alignItems="center">
                  <Avatar name="Tia" size="md" src="https://i.ibb.co/7tGKGvb/shanice.jpg" />
                  <Flex direction="column">
                    <Text>Tia Marz</Text>
                    <Text size="200" color="subtle">
                      Personal
                    </Text>
                    <Text size="200" color="subtle">
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
              option={{ value: 'item 2', label: 'Another custom link' }}
              onClick={({ event }) => event.preventDefault()}
            >
              <Box width="100%">
                <Flex gap={2} alignItems="center">
                  <Avatar name="Bruno" size="md" src="https://i.ibb.co/4Mbhbnb/Bruno.jpg" />
                  <Flex direction="column">
                    <Text>Bruno</Text>
                    <Text size="200" color="subtle">
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
              option={{ value: 'settings', label: 'Settings' }}
              onClick={({ event }) => event.preventDefault()}
            />
            <Dropdown.Link
              href="#"
              isExternal
              option={{ value: 'help', label: 'Get help' }}
              onClick={({ event }) => event.preventDefault()}
            />
          </Dropdown.Section>
        </Dropdown>
      )}
    </Fragment>
  );
}
