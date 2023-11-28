// @flow strict
import React, { type Node as ReactNode } from 'react';
import { Box, SideNavigation } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box height={362} width={280} overflow="scroll">
      <SideNavigation accessibilityLabel="Nested items example">
        <SideNavigation.Group label="Christmas" icon="people" display="expandableExpanded">
          <SideNavigation.NestedItem
            href="#"
            onClick={({ event }) => event.preventDefault()}
            label="Luxury Christmas"
          />
          <SideNavigation.NestedGroup label="Classic Christmas" display="expandableExpanded">
            <SideNavigation.NestedItem
              href="#"
              onClick={({ event }) => event.preventDefault()}
              label="West Coast"
            />
          </SideNavigation.NestedGroup>
          <SideNavigation.NestedItem
            href="#"
            onClick={({ event }) => event.preventDefault()}
            label="Luxury Christmas"
          />
        </SideNavigation.Group>
      </SideNavigation>
    </Box>
  );
}
