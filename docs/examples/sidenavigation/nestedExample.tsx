import React from 'react';
import { Box, SideNavigation } from 'gestalt';

export default function Example() {
  return (
    <Box height={362} overflow="scroll" width={280}>
      <SideNavigation accessibilityLabel="Nested items example">
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
          {/* @ts-expect-error - TS2741 - Property 'onExpand' is missing in type '{ children: Element[]; icon: "people"; label: string; }' but required in type 'SideNavigationGroupProps'. */}
          <SideNavigation.Group icon="people" label="Christmas">
            <SideNavigation.NestedItem
              href="#"
              label="Luxury Christmas"
              onClick={({ event }) => event.preventDefault()}
            />
            {/* @ts-expect-error - TS2741 - Property 'onExpand' is missing in type '{ children: Element[]; label: string; }' but required in type 'SideNavigationNestedGroupProps'. */}
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
            {/* @ts-expect-error - TS2741 - Property 'onExpand' is missing in type '{ children: Element[]; label: string; }' but required in type 'SideNavigationNestedGroupProps'. */}
            <SideNavigation.NestedGroup label="Alternative Christmas">
              <SideNavigation.NestedItem
                active="section"
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
          {/* @ts-expect-error - TS2741 - Property 'onExpand' is missing in type '{ children: Element[]; display: "static"; icon: "people"; label: string; }' but required in type 'SideNavigationGroupProps'. */}
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
  );
}
