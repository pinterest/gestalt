// @flow strict
import { type Node } from 'react';
import { Box, Image, PageHeader } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <Box width="100vw">
      <PageHeader
        title="Product groups"
        subtext="S. E. All products USD"
        badge={{ text: 'Beta', tooltipText: 'This feature is on beta phase' }}
        helperIconButton={{
          accessibilityLabel: 'test',
          accessibilityControls: 'test',
          accessibilityExpanded: false,
          onClick: () => {},
        }}
        thumbnail={
          <Image
            alt="square"
            fit="cover"
            naturalHeight={1}
            naturalWidth={1}
            src="https://i.ibb.co/d0pQsJz/stock3.jpg"
          />
        }
      />
    </Box>
  );
}
