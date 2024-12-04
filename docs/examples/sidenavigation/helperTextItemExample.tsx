import React from 'react';
import { Box, SideNavigation } from 'gestalt';

export default function Example() {
  return (
    <Box height="100%" width={300}>
      <SideNavigation accessibilityLabel="Helper text items">
        <SideNavigation.TopItem
          helperText='Reporting subtext'
          href="#"
          icon="ads-stats"
          label="Reports"
          onClick={({ event }) => event.preventDefault()}
        />
        <SideNavigation.Section label="Audiences">
          <SideNavigation.TopItem
            helperText='8.5m+ users'
            href="#"
            icon="people"
            label="Group A"
            onClick={({ event }) => event.preventDefault()}
          />

          <SideNavigation.Group expanded icon="people" label="Group B">
            <SideNavigation.NestedItem
              helperText='2.3m+ users'
              href="#"
              label="Sub audience 1"
              onClick={({ event }) => event.preventDefault()}
            />

            <SideNavigation.NestedGroup label="Sub audience 2">
              <SideNavigation.NestedItem
                helperText='100k+ users'
                href="#"
                label="Region 1"
                onClick={({ event }) => event.preventDefault()}
              />
              <SideNavigation.NestedItem
                helperText='50k+ users'
                href="#"
                label="Region 2"
                onClick={({ event }) => event.preventDefault()}
              />
            </SideNavigation.NestedGroup>
          </SideNavigation.Group>
        </SideNavigation.Section>
      </SideNavigation>
    </Box>
  );
}
