// @flow strict
import { useRef } from 'react';
import { Box, Popover as Renamed } from 'gestalt';

export default function TestComp() {
    const anchorRef = useRef();

  return (
    <Renamed anchor={anchorRef} onDismiss={() => {}}>
      <Box/>
    </Renamed>
  );
}
