import { useState } from 'react';
import { ButtonGroup, ButtonToggle, Flex } from 'gestalt';

export default function Example() {
  const [selected, setSelected] = useState(false);

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <ButtonGroup>
        <ButtonToggle
          graphicSrc="https://s.pinimg.com/webapp/protective-8fad3fab.svg"
          onClick={() => setSelected((value) => !value)}
          selected={selected}
          size="lg"
          text="Protective"
        />
        <ButtonToggle
          disabled
          graphicSrc="https://s.pinimg.com/webapp/protective-8fad3fab.svg"
          onClick={() => setSelected((value) => !value)}
          selected={false}
          size="lg"
          text="Disabled"
        />
      </ButtonGroup>
    </Flex>
  );
}
