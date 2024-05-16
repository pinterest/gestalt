import React, {ReactNode} from 'react';
import { Box, SideNavigation } from 'gestalt';

export default function Example() {
  return (
    <Box height={362} overflow="scroll" width={280}>
      <SideNavigation accessibilityLabel="Nested items example">
        <SideNavigation.Group icon="people" label="Christmas">
          <SideNavigation.NestedItem
            href="#"
            label="Luxury Christmas"
            onClick={({ event }) => event.preventDefault()}
          />
          <SideNavigation.NestedGroup label="Classic Christmas">
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
