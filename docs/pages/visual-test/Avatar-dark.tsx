import { Avatar, Box, ColorSchemeProvider, DesignTokensProvider } from 'gestalt';

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <DesignTokensProvider>
        <Box color="default" display="inlineBlock" padding={1}>
          <Avatar
            name="Keerthi"
            size="xl"
            src="https://i.pinimg.com/originals/bf/bc/27/bfbc27685d81eb9a8f65c201ea661f0e.jpg"
            verified
          />
        </Box>
      </DesignTokensProvider>
    </ColorSchemeProvider>
  );
}
