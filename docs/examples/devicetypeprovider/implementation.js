// @flow strict
import React, { type Node } from 'react';
import { Box, Button, DeviceTypeProvider, Flex, SideNavigation } from 'gestalt';

export default function Example(): Node {
  const [deviceType, setDeviceType] = React.useState('desktop');

  return (
    <Flex>
      <Box padding={2}>
        <Button
          accessibilityControls="sidenav"
          accessibilityLabel={`Toggle to ${deviceType === 'desktop' ? 'mobile' : 'desktop'} view`}
          color="red"
          text={`Toggle to ${deviceType === 'desktop' ? 'mobile' : 'desktop'} view`}
          size="lg"
          onClick={() => setDeviceType((value) => (value === 'desktop' ? 'mobile' : 'desktop'))}
        />
      </Box>
      <Flex.Item flex="grow">
        <DeviceTypeProvider deviceType={deviceType}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="secondary"
            height={500}
          >
            <Box height={450} width={280} color="default" id="sidenav">
              <SideNavigation
                mobileTitle="Advertisement"
                accessibilityLabel="Mobile device example"
                dismissButton={{
                  onDismiss: () => {},
                  accessibilityLabel: 'Close navigation',
                }}
              >
                <SideNavigation.TopItem
                  href="#"
                  onClick={({ event }) => event.preventDefault()}
                  label="Reporting"
                  icon="ads-stats"
                />
                <SideNavigation.TopItem
                  href="#"
                  onClick={({ event }) => event.preventDefault()}
                  label="Conversions"
                  icon="replace"
                />
                <SideNavigation.Section label="Audiences">
                  <SideNavigation.TopItem
                    href="#"
                    onClick={({ event }) => event.preventDefault()}
                    label="Thanksgiving"
                    icon="people"
                  />
                  <SideNavigation.Group label="Christmas" icon="people">
                    <SideNavigation.NestedItem
                      href="#"
                      onClick={({ event }) => event.preventDefault()}
                      label="Luxury Christmas"
                    />
                    <SideNavigation.NestedGroup label="Classic Christmas">
                      <SideNavigation.NestedItem
                        href="#"
                        onClick={({ event }) => event.preventDefault()}
                        label="West Coast"
                      />
                      <SideNavigation.NestedItem
                        href="#"
                        onClick={({ event }) => event.preventDefault()}
                        label="East Coast"
                      />
                    </SideNavigation.NestedGroup>
                    <SideNavigation.NestedGroup label="Alternative Christmas">
                      <SideNavigation.NestedItem
                        href="#"
                        onClick={({ event }) => event.preventDefault()}
                        label="West Coast"
                      />
                      <SideNavigation.NestedItem
                        href="#"
                        onClick={({ event }) => event.preventDefault()}
                        label="East Coast"
                      />
                    </SideNavigation.NestedGroup>
                  </SideNavigation.Group>
                  <SideNavigation.Group label="Halloween" icon="people" display="static">
                    <SideNavigation.NestedItem
                      href="#"
                      onClick={({ event }) => event.preventDefault()}
                      label="East Coast"
                    />
                    <SideNavigation.NestedItem
                      href="#"
                      onClick={({ event }) => event.preventDefault()}
                      label="West Coast"
                    />
                  </SideNavigation.Group>
                </SideNavigation.Section>
              </SideNavigation>
            </Box>
          </Box>
        </DeviceTypeProvider>
      </Flex.Item>
    </Flex>
  );
}
