import { useState } from 'react';
import { ButtonGroup, ButtonToggle, Flex } from 'gestalt';

export default function Example() {
  const [saved, setSaved] = useState(false);
  const [shared, setShared] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <ButtonGroup>
        <ButtonToggle
          color="red"
          iconStart="pin"
          onClick={() => setSaved((value) => !value)}
          selected={saved}
          size="lg"
          text={saved ? 'Saved' : 'Save'}
        />
        <ButtonToggle
          iconStart="share"
          onClick={() => setShared((value) => !value)}
          selected={shared}
          size="lg"
          text={shared ? 'Shared' : 'Share'}
        />
        <ButtonToggle
          iconStart="star"
          onClick={() => setBookmarked((value) => !value)}
          selected={bookmarked}
          size="lg"
          text={bookmarked ? 'Bookmarked' : 'Bookmark'}
        />
      </ButtonGroup>
    </Flex>
  );
}
