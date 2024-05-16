import { ReactNode, useState } from 'react';
import { Box, Button, DeviceTypeProvider, Flex, SideNavigation } from 'gestalt';

export default function Example() {
  const [deviceType, setDeviceType] = useState('desktop');

  return (
    <Flex>
      <Box padding={2}>
        <Button
          accessibilityControls="sidenav"
          accessibilityLabel={`Toggle to ${deviceType === 'desktop' ? 'mobile' : 'desktop'} view`}
          color="red"
          onClick={() => setDeviceType((value) => (value === 'desktop' ? 'mobile' : 'desktop'))}
          size="lg"
          text={`Toggle to ${deviceType === 'desktop' ? 'mobile' : 'desktop'} view`}
        />
      </Box>
      <Flex.Item flex="grow">
{ /* @ts-expect-error - TS2322 - Type 'string' is not assignable to type '"desktop" | "mobile"'. */}
        <DeviceTypeProvider deviceType={deviceType}>
          <Box
            alignItems="center"
            color="secondary"
            display="flex"
            height={500}
            justifyContent="center"
          >
            <Box color="default" height={450} id="sidenav" width={280}>
              <SideNavigation
                accessibilityLabel="Mobile device example"
                dismissButton={{
                  onDismiss: () => {},
                  accessibilityLabel: 'Close navigation',
                }}
                mobileTitle="Advertisement"
              >
                <SideNavigation.TopItem
                  href="#"
                  icon="ads-stats"
                  label="Reporting"
                  onClick={({ event }) => event.preventDefault()}
                />
                <SideNavigation.TopItem
                  href="#"
                  icon="replace"
                  label="Conversions"
                  onClick={({ event }) => event.preventDefault()}
                />
                <SideNavigation.Section label="Audiences">
                  <SideNavigation.TopItem
                    href="#"
                    icon="people"
                    label="Thanksgiving"
                    onClick={({ event }) => event.preventDefault()}
                  />
{ /* @ts-expect-error - TS2741 - Property 'onExpand' is missing in type '{ children: Element[]; icon: "people"; label: string; }' but required in type 'SideNavigationGroupProps'. */}
                  <SideNavigation.Group icon="people" label="Christmas">
                    <SideNavigation.NestedItem
                      href="#"
                      label="Luxury Christmas"
                      onClick={({ event }) => event.preventDefault()}
                    />
{ /* @ts-expect-error - TS2741 - Property 'onExpand' is missing in type '{ children: Element[]; label: string; }' but required in type 'SideNavigationNestedGroupProps'. */}
                    <SideNavigation.NestedGroup label="Classic Christmas">
                      <SideNavigation.NestedItem
                        href="#"
                        label="West Coast"
                        onClick={({ event }) => event.preventDefault()}
                      />
                      <SideNavigation.NestedItem
                        href="#"
                        label="East Coast"
                        onClick={({ event }) => event.preventDefault()}
                      />
                    </SideNavigation.NestedGroup>
{ /* @ts-expect-error - TS2741 - Property 'onExpand' is missing in type '{ children: Element[]; label: string; }' but required in type 'SideNavigationNestedGroupProps'. */}
                    <SideNavigation.NestedGroup label="Alternative Christmas">
                      <SideNavigation.NestedItem
                        href="#"
                        label="West Coast"
                        onClick={({ event }) => event.preventDefault()}
                      />
                      <SideNavigation.NestedItem
                        href="#"
                        label="East Coast"
                        onClick={({ event }) => event.preventDefault()}
                      />
                    </SideNavigation.NestedGroup>
                  </SideNavigation.Group>
{ /* @ts-expect-error - TS2741 - Property 'onExpand' is missing in type '{ children: Element[]; display: "static"; icon: "people"; label: string; }' but required in type 'SideNavigationGroupProps'. */}
                  <SideNavigation.Group display="static" icon="people" label="Halloween">
                    <SideNavigation.NestedItem
                      href="#"
                      label="East Coast"
                      onClick={({ event }) => event.preventDefault()}
                    />
                    <SideNavigation.NestedItem
                      href="#"
                      label="West Coast"
                      onClick={({ event }) => event.preventDefault()}
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
