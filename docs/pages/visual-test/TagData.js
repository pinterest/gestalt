// @flow strict
import { type Node } from 'react';
import { Box, Flex, TagData, ColorSchemeProvider } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="light">
      <Box color="default" display="inlineBlock" padding={1}>
        <Flex gap={2}>
          <TagData baseColor="white" text="CPM" showCheckbox onRemove={() => {}} />
          <TagData baseColor="white" text="CPM" showCheckbox selected onRemove={() => {}} />
          <TagData
            baseColor="white"
            color="03"
            showCheckbox
            selected
            text="Impressions"
            onRemove={() => {}}
          />
        </Flex>
      </Box>
    </ColorSchemeProvider>
  );
}
