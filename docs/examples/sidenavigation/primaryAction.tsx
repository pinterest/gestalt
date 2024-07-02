import { useState } from 'react';
import { Box, Button, DeviceTypeProvider, Dropdown, Flex, SideNavigation } from 'gestalt';

export default function Example() {
  const [mobile, setMobile] = useState(false);

  return (
    <Box color="lightWash" height="100%" padding={4} position="relative">
      <Flex gap={12} justifyContent="center" wrap>
        <Button color="red" onClick={() => setMobile(true)} text="View mobile" />
        <DeviceTypeProvider deviceType={mobile ? 'mobile' : 'desktop'}>
          <Box
            bottom
            id="sidenavigation"
            left={mobile}
            position={mobile ? 'absolute' : undefined}
            right={mobile}
            top={mobile}
            width={mobile ? '100%' : 360}
          >
            <SideNavigation
              accessibilityLabel="Notification example"
              dismissButton={{ onDismiss: () => setMobile((value) => !value) }}
            >
              <SideNavigation.TopItem
                counter={{ number: '10', accessibilityLabel: '10 updates' }}
                href="#"
                label="Campaign z-168i"
                onClick={({ event }) => {
                  event.preventDefault();
                }}
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
                label="Campaign a-j6ki (inactive)"
                onClick={({ event }) => {
                  event.preventDefault();
                }}
                primaryAction={{
                  icon: 'trash-can',
                  onClick: ({ event }) => {
                    event.preventDefault();
                  },
                  tooltip: { text: 'Delete campaign' },
                }}
              />
              <SideNavigation.Group
                counter={{ number: '12', accessibilityLabel: '12 campaign drafts' }}
                label="Campaign drafts"
                primaryAction={{
                  onClick: ({ event }) => {
                    event.preventDefault();
                  },
                  tooltip: { text: 'More options' },
                  dropdownItems: [
                    <Dropdown.Item
                      key="edit"
                      onSelect={() => {}}
                      option={{ value: 'Edit', label: 'Edit' }}
                    />,
                    <Dropdown.Item
                      key="trash"
                      onSelect={() => {}}
                      option={{ value: 'Delete', label: 'Delete' }}
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
                  label="West Coast"
                  onClick={({ event }) => event.preventDefault()}
                  primaryAction={{
                    onClick: ({ event }) => {
                      event.preventDefault();
                    },
                    tooltip: { text: 'More options' },
                    dropdownItems: [
                      <Dropdown.Item
                        key="edit"
                        onSelect={() => {}}
                        option={{ value: 'Edit', label: 'Edit' }}
                      />,
                      <Dropdown.Item
                        key="trash"
                        onSelect={() => {}}
                        option={{ value: 'Delete', label: 'Delete' }}
                      />,
                    ],
                  }}
                />
                <SideNavigation.NestedItem
                  href="#"
                  label="East Coast"
                  onClick={({ event }) => event.preventDefault()}
                  primaryAction={{
                    onClick: ({ event }) => {
                      event.preventDefault();
                    },
                    tooltip: { text: 'More options' },
                    dropdownItems: [
                      <Dropdown.Item
                        key="edit"
                        onSelect={() => {}}
                        option={{ value: 'Edit', label: 'Edit' }}
                      />,
                      <Dropdown.Item
                        key="trash"
                        onSelect={() => {}}
                        option={{ value: 'Delete', label: 'Delete' }}
                      />,
                    ],
                  }}
                />
                <SideNavigation.NestedGroup
                  label="Alternative campaigns"
                  primaryAction={{
                    onClick: ({ event }) => {
                      event.preventDefault();
                    },
                    tooltip: { text: 'More options' },
                    dropdownItems: [
                      <Dropdown.Item
                        key="edit"
                        onSelect={() => {}}
                        option={{ value: 'Edit', label: 'Edit' }}
                      />,
                      <Dropdown.Item
                        key="trash"
                        onSelect={() => {}}
                        option={{ value: 'Delete', label: 'Delete' }}
                      />,
                    ],
                  }}
                >
                  <SideNavigation.NestedItem
                    href="#"
                    label="West Coast"
                    onClick={({ event }) => event.preventDefault()}
                    primaryAction={{
                      onClick: ({ event }) => {
                        event.preventDefault();
                      },
                      tooltip: { text: 'More options' },
                      dropdownItems: [
                        <Dropdown.Item
                          key="edit"
                          onSelect={() => {}}
                          option={{ value: 'Edit', label: 'Edit' }}
                        />,
                        <Dropdown.Item
                          key="trash"
                          onSelect={() => {}}
                          option={{ value: 'Delete', label: 'Delete' }}
                        />,
                      ],
                    }}
                  />
                  <SideNavigation.NestedItem
                    href="#"
                    label="East Coast"
                    onClick={({ event }) => event.preventDefault()}
                  />
                </SideNavigation.NestedGroup>
              </SideNavigation.Group>
              <SideNavigation.TopItem
                counter={{ number: '87', accessibilityLabel: '87 archived campaings' }}
                href="#"
                label="Archived campaigns"
                onClick={({ event }) => event.preventDefault()}
                primaryAction={{
                  onClick: ({ event }) => {
                    event.preventDefault();
                  },
                  tooltip: { text: 'More options' },
                  dropdownItems: [
                    <Dropdown.Item
                      key="edit"
                      onSelect={() => {}}
                      option={{ value: 'Edit', label: 'Edit' }}
                    />,
                    <Dropdown.Item
                      key="trash"
                      onSelect={() => {}}
                      option={{ value: 'Delete', label: 'Delete' }}
                    />,
                  ],
                }}
              />
            </SideNavigation>
          </Box>
        </DeviceTypeProvider>
      </Flex>
    </Box>
  );
}
