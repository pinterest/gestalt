import { Box, Button, ButtonGroup, ColorSchemeProvider, DesignTokensProvider } from 'gestalt';

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="dark">
      {' '}
      <DesignTokensProvider>
        <Box color="default" display="inlineBlock" padding={1}>
          <ButtonGroup>
            <Button text="Button 1" />
            <Button text="Button 2" />
          </ButtonGroup>
        </Box>
      </DesignTokensProvider>
    </ColorSchemeProvider>
  );
}
