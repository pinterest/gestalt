// @flow strict
import { type Node, useRef, useState } from 'react';
import { Box, Button, Flex, TapArea, Text } from 'gestalt';

export default function TapAreaRefExample(): Node {
  const ref = useRef<HTMLDivElement | HTMLAnchorElement | HTMLButtonElement | null>(null);
  const [focus, setFocus] = useState(0);

  return (
    <Box padding={4} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex gap={{ column: 4, row: 2 }} direction="column" alignItems="center">
        <Button text="Focus the TapArea" onClick={() => ref.current?.focus()} />
        <TapArea ref={ref} rounding="pill" onFocus={() => setFocus(focus + 1)}>
          <Box borderStyle="sm" padding={2} rounding="pill">
            <Text>TapArea is focused {focus} times</Text>
          </Box>
        </TapArea>
      </Flex>
    </Box>
  );
}
