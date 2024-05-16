import { Badge, Box, ColorSchemeProvider, Flex } from 'gestalt';

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" padding={1}>
        <Flex gap={{ row: 4, column: 2 }} width={400} wrap>
          <Badge text="Success badge" type="success" />
          <Badge text="Error badge" type="error" />
          <Badge text="Warning badge" type="warning" />
          <Badge text="Neutral badge" type="neutral" />
          <Badge text="LightWash badge" type="lightWash" />
          <Badge text="DarkWash badge" type="darkWash" />
          <Badge text="Info badge" />
          <Box display="flex" height={80} justifyContent="center" width={350}>
            {/* @ts-expect-error - TS2322 - Type '{ text: string; tooltip: { text: string; }; }' is not assignable to type 'IntrinsicAttributes & BadgeProps'. */}
            <Badge text="Info badge with tooltip" tooltip={{ text: 'Tooltip' }} />
          </Box>
        </Flex>
      </Box>
    </ColorSchemeProvider>
  );
}
