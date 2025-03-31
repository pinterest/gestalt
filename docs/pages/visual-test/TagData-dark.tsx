import { Box, ColorSchemeProvider, DesignTokensProvider,Flex, TagData } from 'gestalt';

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <DesignTokensProvider>
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
      </DesignTokensProvider>
    </ColorSchemeProvider>
  );
}
