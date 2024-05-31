import { useState } from 'react';
import { Box, ButtonGroup, ButtonToggle, Flex } from 'gestalt';

export default function Example() {
  const [saved, setSaved] = useState(false);
  const [shared, setShared] = useState(false);
  const [bookmarked, setBookmarked] = useState(true);

  return (
    <Flex alignItems="center" gap={2} height="100%" justifyContent="center" width="100%">
      <ButtonGroup>
        <ButtonToggle
          color="red"
          iconStart="pin"
          onClick={() => setSaved(!saved)}
          selected={saved}
          size="lg"
          text={saved ? 'Saved' : 'Save'}
        />
        <ButtonToggle
          iconStart="share"
          onClick={() => setShared(!shared)}
          selected={shared}
          size="lg"
          text={shared ? 'Shared' : 'Share'}
        />
        <ButtonToggle
          iconStart="star"
          onClick={() => setBookmarked(!bookmarked)}
          selected={bookmarked}
          size="lg"
          text={bookmarked ? 'Bookmarked' : 'Bookmark'}
        />
      </ButtonGroup>
    </Flex>
  );
}
