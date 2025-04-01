import { Box, ColorSchemeProvider, DesignTokensProvider, List } from 'gestalt';

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <DesignTokensProvider>
        <Box color="default" padding={1}>
          <List label="This application will be able to" type="unordered">
            <List.Item text="Access your follows and followers" />
            <List.Item text="Create new Pins for you" />
            <List.Item text="Follow things for you" />
          </List>
        </Box>
      </DesignTokensProvider>
    </ColorSchemeProvider>
  );
}
