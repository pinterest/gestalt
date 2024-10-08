import { Box, SearchGuide } from 'gestalt';

export default function Screenshot() {
  return (
    <Box color="default" display="inlineBlock" padding={1}>
      <SearchGuide accessibilityLabel="Messages" text="Messages" />
    </Box>
  );
}
