import { Box, ColorSchemeProvider, DesignTokensProvider, IconButtonFloating } from 'gestalt';

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <DesignTokensProvider>
        <Box color="default" display="inlineBlock" padding={4}>
          <IconButtonFloating
            accessibilityLabel="test"
            accessibilityPopupRole="menu"
            icon="add"
            onClick={() => {}}
            tooltip={{
              text: 'test',
            }}
          />
        </Box>
      </DesignTokensProvider>
    </ColorSchemeProvider>
  );
}
