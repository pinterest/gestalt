// @flow strict
import { useRef } from 'react';
import { Box,Flyout as Renamed } from 'gestalt';

export default function TestComp() {
    const anchorRef = useRef();

  return (
    <Renamed onDismiss={() => {}} anchor={anchorRef}>
      <Box/>
    </Renamed>
  );
}
