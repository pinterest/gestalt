// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Checkbox, ColorSchemeProvider, Flex } from 'gestalt';

export default function Snapshot(): ReactNode {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" display="inlineBlock" padding={1}>
        <Flex
          direction="column"
          gap={{
            row: 0,
            column: 2,
          }}
        >
          <Checkbox
            checked
            helperText="USA and India have the top number of English speakers "
            id="english-info"
            label="English"
            onChange={() => {}}
          />
          <Checkbox
            checked={false}
            helperText="Mexico and Colombia have the top number of Spanish speakers"
            id="spanish-info"
            label="Spanish"
            onChange={() => {}}
          />
        </Flex>{' '}
      </Box>
    </ColorSchemeProvider>
  );
}
