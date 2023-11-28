// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, ColorSchemeProvider, Tabs } from 'gestalt';

export default function Snapshot(): ReactNode {
  return (
    <ColorSchemeProvider colorScheme="light">
      <Box color="default" display="inlineBlock" padding={1} width={300}>
        <Tabs
          activeTabIndex={0}
          onChange={() => {}}
          tabs={[
            { href: '#', text: 'Explore' },
            { href: '#', text: 'Shop', indicator: 'dot' },
            { href: '#', text: 'Profiles' },
          ]}
        />
      </Box>
    </ColorSchemeProvider>
  );
}
