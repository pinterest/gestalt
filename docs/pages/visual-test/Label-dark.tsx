import { ReactNode } from 'react';
import { Box, ColorSchemeProvider, Flex, Label, Switch, Text } from 'gestalt';

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" display="inlineBlock" padding={1}>
        <Flex
          gap={{
            row: 2,
            column: 0,
          }}
        >
          <Box paddingY={1}>
            <Label htmlFor="switchExample">
              <Text>Darkmode</Text>
            </Label>
          </Box>
          <Switch id="switchExample" onChange={() => {}} />
        </Flex>
      </Box>
    </ColorSchemeProvider>
  );
}
