// @flow strict
import { useRef } from 'react';
import { Box, Popover } from 'gestalt';

export default function TestComp() {
    const anchorRef = useRef();

  return (
    <Popover anchor={anchorRef} onDismiss={() => {}}>
      <Box/>
    </Popover>
  );
}
