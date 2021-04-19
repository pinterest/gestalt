// @flow strict
import { useRef } from 'react';
import { Flyout, Box } from 'gestalt';

export default function TestComp() {
    const anchorRef = useRef();

  return (
    <Flyout onDismiss={() => {}} anchor={anchorRef} >
      <Box/>
    </Flyout>
  );
}
