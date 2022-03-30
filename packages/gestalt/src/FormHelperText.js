// @flow strict

import { type Node } from 'react';
import Box from './Box.js';
import Text from './Text.js';

export default function FormHelperText({ text }: {| text: string |}): Node {
  return (
    <Box marginTop={2}>
      <Text color="subtle" size="100">
        {text}
      </Text>
    </Box>
  );
}
