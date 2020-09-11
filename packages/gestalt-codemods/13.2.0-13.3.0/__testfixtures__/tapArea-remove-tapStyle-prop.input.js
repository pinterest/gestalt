// @flow strict
import React from 'react';
import { Box, TapArea, TapArea as Renamed } from 'gestalt';

export default function TestBox() {
  return (
    <Box>
      <TapArea tapStyle="none"/>
      <Renamed tapStyle="none"/>
    </Box>
  );
}
