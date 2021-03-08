// @flow strict
import React from 'react';
import { Flyout, Box } from 'gestalt';

export default function TestComp() {
    const anchorRef = React.useRef();

  return (
    <Flyout anchor={anchorRef} onDismiss={() => {}}>
      <Box/>
    </Flyout>
  );
}
