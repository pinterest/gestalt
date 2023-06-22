// @flow strict
import { type Node, useRef, useState } from 'react';
import { Box, Button, Popover, Text } from 'gestalt';

export default function ButtonPopoverExample(): Node {
  const [selected, setSelected] = useState(false);
  const anchorRef = useRef<null | HTMLAnchorElement | HTMLButtonElement>(null);

  return (
    <Box padding={8} display="flex" justifyContent="center" width="100%">
      <Button
        onClick={() => setSelected(!selected)}
        ref={anchorRef}
        selected={selected}
        text={selected ? 'Hide Popover' : 'Show Popover'}
        iconEnd="arrow-down"
      />
      {selected && (
        <Popover
          anchor={anchorRef.current}
          idealDirection="right"
          onDismiss={() => setSelected(false)}
          shouldFocus={false}
        >
          <Box padding={3}>
            <Text weight="bold">This is a Button with an anchor ref to a Popover component</Text>
          </Box>
        </Popover>
      )}
    </Box>
  );
}
