import { Badge, Box, ColorSchemeProvider, DesignTokensProvider,Flex } from 'gestalt';

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="dark">    <DesignTokensProvider>
      <Box color="default" padding={1}>
        <Flex gap={{ row: 4, column: 2 }} width={400} wrap>
          <Badge text="Success badge" type="success" />
          <Badge text="Error badge" type="error" />
          <Badge text="Warning badge" type="warning" />
          <Badge text="Neutral badge" type="neutral" />
          <Badge text="LightWash badge" type="lightWash" />
          <Badge text="DarkWash badge" type="darkWash" />
          <Badge text="Info badge" />
          <Badge text="ช่วยพูดอีกครั้งได้ไหม" />
          <Box display="flex" height={80} justifyContent="center" width={350}>
            <Badge text="Info badge with tooltip" tooltip={{ text: 'Tooltip' }} />
          </Box>
          <Box display="flex" height={80} justifyContent="center" width={350}>
            <Badge text="ช่วยพูดอีกครั้งได้ไหม" tooltip={{ text: 'ช่วยพูดอีกครั้งได้ไหม' }} />
          </Box>
        </Flex>
      </Box>
    </DesignTokensProvider></ColorSchemeProvider>
  );
}
