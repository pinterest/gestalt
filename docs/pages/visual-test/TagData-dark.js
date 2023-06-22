// @flow strict
import { type Node } from 'react';
import { Box, ColorSchemeProvider, Flex, TagData } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" display="inlineBlock" padding={1}>
        <Flex gap={2}>
          <TagData text="CPM" showCheckbox onRemove={() => {}} />
          <TagData text="CPM" showCheckbox selected onRemove={() => {}} />
          <TagData
            baseColor="primary"
            color="03"
            onRemove={() => {}}
            showCheckbox
            selected
            text="Impressions"
          />
        </Flex>
      </Box>
    </ColorSchemeProvider>
  );
}
