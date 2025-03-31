import { Box, ColorSchemeProvider, DesignTokensProvider,Tabs } from 'gestalt';

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <DesignTokensProvider>
        <Box color="default" display="inlineBlock" padding={1} width={300}>
          <Tabs
            activeTabIndex={0}
            onChange={() => {}}
            tabs={[
              { href: '#', text: 'Explore' },
              { href: '#', text: 'Shop', indicator: 'dot' },
              { href: '#', text: 'Profiles' },
            ]}
          />{' '}
        </Box>
      </DesignTokensProvider>
    </ColorSchemeProvider>
  );
}
