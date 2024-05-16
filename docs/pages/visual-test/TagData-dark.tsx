import { ReactNode } from 'react';
import { Box, ColorSchemeProvider, Flex, TagData } from 'gestalt';

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" display="inlineBlock" padding={1}>
        <Flex gap={2}>
          <TagData onRemove={() => {}} showCheckbox text="CPM" />
          <TagData onRemove={() => {}} selected showCheckbox text="CPM" />
          <TagData
            baseColor="primary"
            color="03"
            onRemove={() => {}}
            selected
            showCheckbox
            text="Impressions"
          />
        </Flex>
      </Box>
    </ColorSchemeProvider>
  );
}
