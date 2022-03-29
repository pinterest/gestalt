// @flow strict
import { type Node } from 'react';
import { ColorSchemeProvider, PageHeader, Box, Image } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box width="100vw">
        <PageHeader
          title="Product groups"
          subtext="S. E. All products USD"
          helperIconButton={{
            accessibilityLabel: 'test',
            accessibilityControls: 'test',
            accessibilityExpanded: false,
            onClick: () => {},
          }}
          thumbnail={
            <Image
              alt="square"
              color="#000"
              fit="cover"
              naturalHeight={1}
              naturalWidth={1}
              src="https://i.ibb.co/d0pQsJz/stock3.jpg"
            />
          }
        />
      </Box>
    </ColorSchemeProvider>
  );
}
