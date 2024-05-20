import { Box, ButtonToggle, ColorSchemeProvider } from 'gestalt';

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" display="inlineBlock" padding={1}>
        <ButtonToggle color="gray" text="Save a Pin" />
      </Box>
    </ColorSchemeProvider>
  );
}
