// @flow strict
import { type Node, useState } from 'react';
import { Box, Button, DeviceTypeProvider, Dropdown, Flex, SideNavigation } from 'gestalt';

export default function Example(): Node {
  const [mobile, setMobile] = useState(false);

  return (
    <Box color="lightWash" padding={4} height="100%">
      <Flex gap={12}>
        <Button text="View mobile" onClick={() => setMobile(true)} color="red" />
        <DeviceTypeProvider deviceType={mobile ? 'mobile' : 'desktop'}>
          <Box position={mobile ? 'absolute' : undefined} top bottom left right id="sidenavigation">
            <SideNavigation
              accessibilityLabel="Notification example"
              dismissButton={{ onDismiss: () => setMobile((value) => !value) }}
            >
              <SideNavigation.TopItem
                href="#"
                onClick={({ event }) => {
                  event.preventDefault();
                }}
                label="Campaign z-168i"
                primaryAction={{
                  icon: 'edit',
                  onClick: ({ event }) => {
                    event.preventDefault();
                  },
                  tooltip: { text: 'Rename campaign' },
                }}
              />
              <SideNavigation.TopItem
                href="#"
                onClick={({ event }) => {
                  event.preventDefault();
                }}
                label="Campaign a-j6ki (inactive)"
                primaryAction={{
                  icon: 'trash-can',
                  onClick: ({ event }) => {
                    event.preventDefault();
                  },
                  tooltip: { text: 'Delete campaign' },
                }}
              />
              <SideNavigation.Group
                label="Campaign drafts"
                counter={{ number: '12', accessibilityLabel: '12 campaign drafts' }}
                primaryAction={{
                  onClick: ({ event }) => {
                    event.preventDefault();
                  },
                  tooltip: { text: 'More options' },
                  dropdownItems: [
                    <Dropdown.Item
                      key="edit"
                      option={{ value: 'Edit', label: 'Edit' }}
                      onSelect={() => {}}
                    />,
                    <Dropdown.Item
                      key="trash"
                      option={{ value: 'Delete', label: 'Delete' }}
                      onSelect={() => {}}
                    />,
                  ],
                }}
              >
                <SideNavigation.NestedItem
                  counter={{
                    number: '10',
                    accessibilityLabel: 'You have 10 messages in your inbox',
                  }}
                  href="#"
                  onClick={({ event }) => event.preventDefault()}
                  label="West Coast"
                />
                <SideNavigation.NestedItem
                  href="#"
                  onClick={({ event }) => event.preventDefault()}
                  label="East Coast"
                />
              </SideNavigation.Group>
              <SideNavigation.TopItem
                href="#"
                onClick={({ event }) => event.preventDefault()}
                label="Archived campaigns"
                primaryAction={{
                  onClick: ({ event }) => {
                    event.preventDefault();
                  },
                  tooltip: { text: 'More options' },
                  dropdownItems: [
                    <Dropdown.Item
                      key="edit"
                      option={{ value: 'Edit', label: 'Edit' }}
                      onSelect={() => {}}
                    />,
                    <Dropdown.Item
                      key="trash"
                      option={{ value: 'Delete', label: 'Delete' }}
                      onSelect={() => {}}
                    />,
                  ],
                }}
                counter={{ number: '87', accessibilityLabel: '87 archived campaings' }}
              />
            </SideNavigation>
          </Box>
        </DeviceTypeProvider>
      </Flex>
    </Box>
  );
}
