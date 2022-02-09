// @flow strict

import type { Node } from 'react';
import Box from './Box.js';
import Text from './Text.js';

export default function FormHelperText({ text }: {| text: string |}): Node {
  return (
    <Box marginTop={2}>
      <Text color="gray" size="sm">
        {text}
      </Text>
    </Box>
  );
}
