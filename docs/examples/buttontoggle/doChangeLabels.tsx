import { useState } from 'react';
import { Box, ButtonGroup, ButtonToggle, Flex } from 'gestalt';

export default function Example() {
  const [saved, setSaved] = useState(false);
  const [shared, setShared] = useState(false);
  const [bookmarked, setBookmarked] = useState(true);

  return (
    <Box padding={8}>
      <Flex
        alignContent="stretch"
        alignItems="stretch"
        direction="column"
        flex="grow"
        gap={{ column: 8, row: 0 }}
        width="100%"
      >
        <Flex alignContent="center" alignItems="center" direction="column" width="100%">
          <ButtonGroup>
            <ButtonToggle color='red' onClick={() =>setSaved(!saved)} selected={saved} size="lg" text={saved? "Saved" : "Save"} />
            <ButtonToggle onClick={() =>setShared(!shared)} selected={shared} size="lg" text={shared? "Shared" : "Share"} />
            <ButtonToggle onClick={() =>setBookmarked(!bookmarked)} selected={bookmarked} size="lg" text={bookmarked? "Bookmarked" : "Bookmark"} />
          </ButtonGroup>
        </Flex>
      </Flex>
    </Box>
  );
}
