// @flow strict
import React from 'react';
import { Box, Popover } from 'gestalt';

export default function TestComp() {
    const anchorRef = React.useRef();

  return (
    <Popover anchor={anchorRef} onDismiss={() => {}}>
      <Box/>
    </Popover>
  );
}
