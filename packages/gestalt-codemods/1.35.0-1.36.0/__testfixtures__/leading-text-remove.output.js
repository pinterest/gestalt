// @flow
import React from 'react';
import { Box, Text, Text as Renamed } from 'gestalt';

export default function TestBox() {
  return (
    <Box>
      <Renamed>Hello</Renamed>
      <Text color='blue'>Hello</Text>
    </Box>
  );
}
