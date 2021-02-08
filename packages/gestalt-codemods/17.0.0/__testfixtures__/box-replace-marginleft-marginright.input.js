// @flow strict
import React from 'react';
import { Box } from 'gestalt';

export default function TestBox() {
  return (
    <Box>
      <Box marginLeft={4} marginRight={4} />
      <Box smMarginLeft={4} smMarginRight={4} />
      <Box mdMarginLeft={4} mdMarginRight={4} />
      <Box lgMarginLeft={4} lgMarginRight={4} />
    </Box>
  );
}
