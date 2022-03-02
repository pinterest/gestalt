// @flow strict
import { useRef } from 'react';
import { Flyout as Renamed, Box } from 'gestalt';

export default function TestComp() {
    const anchorRef = useRef();

  return (
    <Renamed onDismiss={() => {}} anchor={anchorRef}>
      <Box/>
    </Renamed>
  );
}
