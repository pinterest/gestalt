// @flow strict
import { type Node as ReactNode, useRef, useState } from 'react';
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

export default function Example(): ReactNode {
  const PAGE_HEADER_ZINDEX = new FixedZIndex(10);

  const [open, setOpen] = useState(false);
  const anchorRef = useRef<null | HTMLAnchorElement | HTMLButtonElement>(null);

  return (
    <DeviceTypeProvider deviceType="mobile">
      <Box display="flex" justifyContent="center" margin={2} width="100%">
        <Button
          ref={anchorRef}
          accessibilityControls="demo-dropdown-example"
          accessibilityExpanded={open}
          accessibilityHaspopup
          iconEnd="arrow-down"
          onClick={() => setOpen((prevVal) => !prevVal)}
          selected={open}
          size="lg"
          text="Menu"
        />
      </Box>
      {open && (
        <Dropdown
          anchor={anchorRef.current}
          disableMobileUI={false}
          headerContent={
            <Text align="start" inline size="100">
              This Pin was inspired by your{' '}
              <Link display="inline" href="https://pinterest.com">
                recent activity
              </Link>
            </Text>
          }
          id="demo-dropdown-example"
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
              isExternal
              onClick={({ event, mobileOnDismissStart }) => {
                event.preventDefault();
                mobileOnDismissStart();
              }}
              option={{ value: 'help', label: 'Get help' }}
            />
          </Dropdown.Section>
        </Dropdown>
      )}
    </DeviceTypeProvider>
  );
}
