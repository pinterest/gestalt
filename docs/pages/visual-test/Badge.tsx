import {ReactNode} from 'react';
import { Badge, Box, Flex } from 'gestalt';

export default function Snapshot() {
  return (
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
          <Badge text="Info badge with tooltip" tooltip={{ text: 'Tooltip' }} />
        </Box>
      </Flex>
    </Box>
  );
}
