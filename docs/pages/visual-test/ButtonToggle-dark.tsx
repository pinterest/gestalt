import { Box, ButtonToggle, ColorSchemeProvider } from 'gestalt';

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" display="inlineBlock" padding={1}>
        <ButtonToggle color="transparent" iconStart="sparkle" text="Save" />
      </Box>
    </ColorSchemeProvider>
  );
}
