// @flow strict
import { type Node, useRef, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  CompositeZIndex,
  DeviceTypeProvider,
  Dropdown,
  FixedZIndex,
  Flex,
  Link,
  Text,
} from 'gestalt';

export default function Example(): Node {
  const PAGE_HEADER_ZINDEX = new FixedZIndex(10);

  const [open, setOpen] = useState(false);
  const anchorRef = useRef<null | HTMLAnchorElement | HTMLButtonElement>(null);

  return (
    <DeviceTypeProvider deviceType="mobile">
      <Box display="flex" justifyContent="center" width="100%" margin={2}>
        <Button
          accessibilityControls="demo-dropdown-example"
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
      {open && (
        <Dropdown
          anchor={anchorRef.current}
          id="demo-dropdown-example"
          onDismiss={() => setOpen(false)}
          zIndex={new CompositeZIndex([PAGE_HEADER_ZINDEX])}
          disableMobileUI={false}
          headerContent={
            <Text align="start" size="100" inline>
              This Pin was inspired by your{' '}
              <Link display="inline" href="https://pinterest.com">
                recent activity
              </Link>
            </Text>
          }
        >
          <Dropdown.Section label="Currently in">
            <Dropdown.Link
              href="#"
              onClick={({ event }) => event.preventDefault()}
              option={{ value: 'item 1', label: 'Custom link 1' }}
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
              onClick={({ event }) => event.preventDefault()}
              href="#"
              option={{ value: 'item 2', label: 'Another custom link' }}
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
              onClick={({ event }) => event.preventDefault()}
              href="#"
              option={{ value: 'settings', label: 'Settings' }}
            />
            <Dropdown.Link
              onClick={({ event, mobileOnDismissStart }) => {
                event.preventDefault();
                mobileOnDismissStart();
              }}
              href="#"
              isExternal
              option={{ value: 'help', label: 'Get help' }}
            />
          </Dropdown.Section>
        </Dropdown>
      )}
    </DeviceTypeProvider>
  );
}
