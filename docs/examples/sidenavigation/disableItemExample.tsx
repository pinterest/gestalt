import React from 'react';
import { Box, SideNavigation } from 'gestalt';

export default function Example() {
  return (
    <Box height="100%" width={300}>
      <SideNavigation accessibilityLabel="Disabled item example">
        <SideNavigation.TopItem
          disabled
          href="#"
          icon="ads-stats"
          label="Reports"
          onClick={({ event }) => event.preventDefault()}
        />
        <SideNavigation.Section label="Catalogs">
          <SideNavigation.TopItem
            disabled
            href="#"
            icon="people"
            label="Thanksgiving"
            onClick={({ event }) => event.preventDefault()}
            subtext='Disabled thanksgiving section'
          />

          <SideNavigation.Group expanded icon="people" label="Christmas">
            <SideNavigation.NestedItem
              disabled
              href="#"
              label="Luxury Christmas"
              onClick={({ event }) => event.preventDefault()}
            />

            <SideNavigation.NestedGroup label="Shopping Categories">
              <SideNavigation.NestedItem
                disabled
                href="#"
                label="Gifts"
                onClick={({ event }) => event.preventDefault()}
              />
              <SideNavigation.NestedItem
                href="#"
                label="Decorations"
                onClick={({ event }) => event.preventDefault()}
              />
            </SideNavigation.NestedGroup>
          </SideNavigation.Group>
        </SideNavigation.Section>
      </SideNavigation>
    </Box>
  );
}
