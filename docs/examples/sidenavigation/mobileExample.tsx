import { ReactNode, useState } from 'react';
import { Box, Button, DeviceTypeProvider, SideNavigation } from 'gestalt';

export default function Example() {
  const [showNav, setShowNav] = useState(false);

  return showNav ? (
    <DeviceTypeProvider deviceType="mobile">
      <Box bottom id="sidenavigation" left position="absolute" right top>
        <SideNavigation
          accessibilityLabel="Mobile device example"
          dismissButton={{
            onDismiss: () => setShowNav(false),
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
    </DeviceTypeProvider>
  ) : (
    <Box padding={2}>
      <Button
        accessibilityControls="sidenavigation"
        accessibilityLabel="Show navigation"
        color="red"
        onClick={() => setShowNav(true)}
        size="lg"
        text="Show navigation"
      />
    </Box>
  );
}
