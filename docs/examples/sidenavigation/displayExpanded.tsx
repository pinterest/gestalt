import { useState } from 'react';
import { Box, SideNavigation } from 'gestalt';

export default function Example() {
  const [expandedElements, setExpandedElements] = useState<ReadonlyArray<string>>([
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
    <Box height="100%" width={280}>
      <SideNavigation accessibilityLabel="Nested items example" showBorder>
        <SideNavigation.Group
          display="expandable"
          expanded={expandedElements.includes('Christmas')}
          icon="people"
          label="Christmas"
          onExpand={handleOnExpand('Christmas')}
        >
          <SideNavigation.NestedItem
            href="#"
            label="Luxury Christmas"
            onClick={({ event }) => event.preventDefault()}
          />
          <SideNavigation.NestedGroup
            display="expandable"
            expanded={expandedElements.includes('Classic Christmas')}
            label="Classic Christmas"
            onExpand={handleOnExpand('Classic Christmas')}
          >
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
