// @flow strict
import { type Node } from 'react';
import { Box, Checkbox, ColorSchemeProvider, Flex } from 'gestalt';

export default function Snapshot(): Node {
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
            id="english-info"
            label="English"
            helperText="USA and India have the top number of English speakers "
            onChange={() => {}}
          />
          <Checkbox
            checked={false}
            id="spanish-info"
            label="Spanish"
            helperText="Mexico and Colombia have the top number of Spanish speakers"
            onChange={() => {}}
          />
        </Flex>{' '}
      </Box>
    </ColorSchemeProvider>
  );
}
