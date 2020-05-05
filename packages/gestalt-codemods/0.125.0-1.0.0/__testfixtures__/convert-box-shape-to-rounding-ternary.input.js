// @flow strict
import React from 'react';
import { Box } from 'gestalt';

const value = true;

export default function Ternary() {
  return (
    <Box shape={value ? 'circle' : 'rounded'}>
      ternary
    </Box>
  );
}
