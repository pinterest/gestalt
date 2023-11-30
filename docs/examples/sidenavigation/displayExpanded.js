// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Box, SideNavigation } from 'gestalt';

export default function Example(): ReactNode {
  const [expandedElements, setExpandedElements] = useState<$ReadOnlyArray<string>>([
    'Christmas',
    'Classic Christmas',
  ]);

  const handleOnExpand =
    (name: string) =>
    ({ expanded }: { expanded: boolean }) => {
      if (expanded) {
        setExpandedElements([...expandedElements, name]);
      } else {
        setExpandedElements(expandedElements.filter((value) => value !== name));
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
          onExpand={handleOnExpand('Christmas')}
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
            onExpand={handleOnExpand('Classic Christmas')}
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
