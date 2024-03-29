// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Image, PageHeader } from 'gestalt';

export default function Snapshot(): ReactNode {
  return (
    <Box width="100vw">
      <PageHeader
        badge={{ text: 'Beta', tooltipText: 'This feature is on beta phase' }}
        helperIconButton={{
          accessibilityLabel: 'test',
          accessibilityControls: 'test',
          accessibilityExpanded: false,
          onClick: () => {},
        }}
        subtext="S. E. All products USD"
        thumbnail={
          <Image
            alt="square"
            fit="cover"
            naturalHeight={1}
            naturalWidth={1}
            src="https://i.ibb.co/d0pQsJz/stock3.jpg"
          />
        }
        title="Product groups"
      />
    </Box>
  );
}
