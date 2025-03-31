import { Box, ColorSchemeProvider, DesignTokensProvider, Divider, Flex } from 'gestalt';

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <DesignTokensProvider>
        <Box borderStyle="shadow" color="default" display="inlineBlock" padding={1}>
          <Flex
            direction="column"
            gap={{
              row: 0,
              column: 2,
            }}
          >
            <Box height={25} width={150} />
            <Divider />
            <Box height={25} width={150} />
          </Flex>
        </Box>
      </DesignTokensProvider>
    </ColorSchemeProvider>
  );
}
