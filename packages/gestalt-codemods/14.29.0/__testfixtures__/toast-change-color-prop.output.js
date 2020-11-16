// @flow strict
import React from 'react';
import { Box, Toast, Toast as Renamed } from 'gestalt';

export default function TestBox() {
  return (
    <Box>
      <Toast text="Simple Toast" />
      <Toast text="Simple Toast" color="red"/>
      <Toast text="Simple Toast" color="white"/>
      <Toast text="Simple Toast" color="white"/>
      <Renamed text="Simple Toast" color="white"/>
    </Box>
  );
}
