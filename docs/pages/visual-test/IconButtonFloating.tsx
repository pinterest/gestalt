import { Box, ColorSchemeProvider, IconButtonFloating } from 'gestalt';

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="light">
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
    </DesignTokensProvider></ColorSchemeProvider>
  );
}
