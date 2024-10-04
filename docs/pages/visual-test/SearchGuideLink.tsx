import { Box, SearchGuideLink } from 'gestalt';

export default function Screenshot() {
  return (
    <Box color="default" display="inlineBlock" padding={1}>
      <SearchGuideLink accessibilityLabel="Messages" href="http://pinterest.com" text="Messages" />
    </Box>
  );
}
