import { useState } from 'react';
import { ButtonToggle, Flex, Image } from 'gestalt';

export default function Example() {
  const [selected, setSelected] = useState(false);

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <ButtonToggle
        onClick={() => setSelected((value) => !value)}
        selected={selected}
        size="lg"
        text="Follow"
        thumbnail={{
          image: (
            <Image
              alt="Braided Hair"
              color="white"
              naturalHeight={44}
              naturalWidth={44}
              src="https://s.pinimg.com/webapp/protective-8fad3fab.svg"
            />
          ),
        }}
      />
    </Flex>
  );
}
