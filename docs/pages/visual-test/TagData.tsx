import {ReactNode} from 'react';
import { Box, ColorSchemeProvider, Flex, TagData } from 'gestalt';

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="light">
      <Box color="default" display="inlineBlock" padding={1}>
        <Flex gap={2}>
          <TagData baseColor="secondary" onRemove={() => {}} showCheckbox text="CPM" />
          <TagData baseColor="secondary" onRemove={() => {}} selected showCheckbox text="CPM" />
          <TagData
            baseColor="secondary"
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
