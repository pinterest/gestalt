import React from 'react';
import { Box, SideNavigation } from 'gestalt';

export default function Example() {
  return (
    <Box height={362} overflow="scroll" width={280}>
      <SideNavigation accessibilityLabel="Nested items example">
        {/* @ts-expect-error - TS2741 - Property 'onExpand' is missing in type '{ children: Element[]; display: "static"; icon: "people"; label: string; }' but required in type 'SideNavigationGroupProps'. */}
        <SideNavigation.Group display="static" icon="people" label="Christmas">
          <SideNavigation.NestedItem
            href="#"
            label="Luxury Christmas"
            onClick={({ event }) => event.preventDefault()}
          />
          {/* @ts-expect-error - TS2741 - Property 'onExpand' is missing in type '{ children: Element; display: "static"; label: string; }' but required in type 'SideNavigationNestedGroupProps'. */}
          <SideNavigation.NestedGroup display="static" label="Classic Christmas">
            <SideNavigation.NestedItem
              href="#"
              label="West Coast"
              onClick={({ event }) => event.preventDefault()}
            />
          </SideNavigation.NestedGroup>
          <SideNavigation.NestedItem
            href="#"
            label="Luxury Christmas"
            onClick={({ event }) => event.preventDefault()}
          />
        </SideNavigation.Group>
      </SideNavigation>
    </Box>
  );
}
