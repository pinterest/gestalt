import { useState } from 'react';
import { ButtonGroup, ButtonToggle, Flex } from 'gestalt';

export default function Example() {
  const [saved, setSaved] = useState(false);

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <ButtonGroup>
        <ButtonToggle
          color="secondaryStrong"
          onClick={() => setSaved((value) => !value)}
          selected={saved}
          size="lg"
          text={saved ? 'Saved' : 'Save'}
        />
      </ButtonGroup>
    </Flex>
  );
}
