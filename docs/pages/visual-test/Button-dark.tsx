import { Box, Button, ColorSchemeProvider, DesignTokensProvider } from 'gestalt';

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <DesignTokensProvider>
        <Box color="default" display="inlineBlock" padding={1}>
          <Button color="gray" text="Save a Pin" />
        </Box>
      </DesignTokensProvider>
    </ColorSchemeProvider>
  );
}
