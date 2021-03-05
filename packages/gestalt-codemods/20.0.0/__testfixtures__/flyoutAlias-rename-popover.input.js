// @flow strict
import React from 'react';
import { Flyout as Renamed, Box } from 'gestalt';

export default function TestComp() {
    const anchorRef = React.useRef();

  return (
    <Renamed anchor={anchorRef} onDismiss={() => {}}>
      <Box/>
    </Renamed>
  );
}
