// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Box, SideNavigation } from 'gestalt';

export default function Example(): ReactNode {
  const [expandedElements, setExpandedElements] = useState<$ReadOnlyArray<string>>([
    'Christmas',
    'Classic Christmas',
  ]);

  const handleOnExpand = ({ label, expanded }: { label: string, expanded: boolean }) => {
    if (expanded) {
      setExpandedElements([...expandedElements, label]);
    } else {
      setExpandedElements(expandedElements.filter((value) => value !== label));
    }
  };

  return (
    <Box height={362} width={280} overflow="scroll">
      <SideNavigation accessibilityLabel="Nested items example">
        <SideNavigation.Group
          label="Christmas"
          icon="people"
          display="expandable"
          expanded={expandedElements.includes('Christmas')}
          onExpand={handleOnExpand}
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
            onExpand={handleOnExpand}
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
  );
}
