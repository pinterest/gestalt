// @flow strict
import React from 'react';
import { Box, Popover as Renamed } from 'gestalt';

export default function TestComp() {
    const anchorRef = React.useRef();

  return (
    <Renamed anchor={anchorRef} onDismiss={() => {}}>
      <Box/>
    </Renamed>
  );
}
