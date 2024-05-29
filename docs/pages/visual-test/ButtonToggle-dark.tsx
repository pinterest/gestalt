import { Box, ButtonGroup, ButtonToggle, ColorSchemeProvider } from 'gestalt';

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" display="inlineBlock" padding={1}>
        <ButtonGroup>
          <ButtonToggle color="transparent" iconStart="sparkle" selected={false} text="Follow" />
          <ButtonToggle color="transparent" iconStart="sparkle" selected text="Follow" />
        </ButtonGroup>
        <ButtonGroup>
          <ButtonToggle color="red" iconStart="sparkle" selected={false} text="Save" />
          <ButtonToggle color="red" iconStart="sparkle" selected text="Save" />
        </ButtonGroup>
      </Box>
    </ColorSchemeProvider>
  );
}
