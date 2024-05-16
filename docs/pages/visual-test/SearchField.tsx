import {ReactNode} from 'react';
import { Box, SearchField } from 'gestalt';

export default function Screenshot() {
  return (
    <Box color="default" display="inlineBlock" padding={1}>
      <SearchField
        accessibilityClearButtonLabel="Clear search field"
        accessibilityLabel=""
        id="searchMessagesLabelExample"
        label="Search Messages"
        onChange={() => {}}
        placeholder="Search by name"
      />
    </Box>
  );
}
