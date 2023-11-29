// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Box, DeviceTypeProvider, SideNavigation } from 'gestalt';

export default function Example(): ReactNode {
  const [expandedElements, setExpandedElements] = useState<$ReadOnlyArray<string>>([
    'Christmas',
    'Classic Christmas',
  ]);

  return (
    <DeviceTypeProvider deviceType="mobile">
      <Box height={362} width={280} overflow="scroll">
        <SideNavigation accessibilityLabel="Nested items example">
          <SideNavigation.Group
            label="Christmas"
            icon="people"
            display="expandable"
            expanded={expandedElements.includes('Christmas')}
            onExpand={({ expanded }) => {
              if (expanded) {
                setExpandedElements([...expandedElements, 'Christmas']);
              } else {
                setExpandedElements(expandedElements.filter((value) => value !== 'Christmas'));
              }
            }}
          >
            <SideNavigation.NestedItem
              href="#"
              onClick={({ event }) => event.preventDefault()}
              label="Luxury Christmas"
            />
            <SideNavigation.NestedGroup
              label="Classic Christmas"
              display="expandable"
              expanded={expandedElements.includes('Classic Christmas')}
              onExpand={({ expanded }) => {
                if (expanded) {
                  setExpandedElements([...expandedElements, 'Classic Christmas']);
                } else {
                  setExpandedElements(
                    expandedElements.filter((value) => value !== 'Classic Christmas'),
                  );
                }
              }}
            >
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
    </DeviceTypeProvider>
  );
}
