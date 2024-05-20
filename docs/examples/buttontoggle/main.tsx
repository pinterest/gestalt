import { useState } from 'react';
import { ButtonToggle, Flex } from 'gestalt';

export default function Example() {
  const [selected, setSelected] = useState(false);

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <ButtonToggle onClick={()=> setSelected(!selected)} selected={selected} size="lg" text="Save"/>
    </Flex>
  );
}
