import React from 'react';
import { Box, SideNavigation } from 'gestalt';

export default function Example() {
  return (
    <Box height="100%" width={300}>
      <SideNavigation accessibilityLabel="Helper text items">
        <SideNavigation.TopItem
          href="#"
          icon="ads-stats"
          label="Reports"
          onClick={({ event }) => event.preventDefault()}
          subtext="Reporting subtext"
        />
        <SideNavigation.Section label="Audiences">
          <SideNavigation.TopItem
            href="#"
            icon="people"
            label="Group A"
            onClick={({ event }) => event.preventDefault()}
            subtext="8.5m+ users"
          />

          <SideNavigation.Group expanded icon="people" label="Group B">
            <SideNavigation.NestedItem
              href="#"
              label="Sub audience 1"
              onClick={({ event }) => event.preventDefault()}
              subtext="2.3m+ users"
            />

            <SideNavigation.NestedGroup label="Sub audience 2">
              <SideNavigation.NestedItem
                href="#"
                label="Region 1"
                onClick={({ event }) => event.preventDefault()}
                subtext="100k+ users"
              />
              <SideNavigation.NestedItem
                href="#"
                label="Region 2"
                onClick={({ event }) => event.preventDefault()}
                subtext="50k+ users"
              />
            </SideNavigation.NestedGroup>
          </SideNavigation.Group>
        </SideNavigation.Section>
      </SideNavigation>
    </Box>
  );
}
