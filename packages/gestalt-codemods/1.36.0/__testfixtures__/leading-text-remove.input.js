// @flow strict
import React from 'react';
import { Box, Text, Text as Renamed } from 'gestalt';

export default function TestBox() {
  return (
    <Box>
      <Renamed leading='short'>Hello</Renamed>
      <Text leading='short' color='blue'>Hello</Text>
    </Box>
  );
}
