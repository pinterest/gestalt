// @flow strict

import * as React from 'react';
import Box from './Box.js';
import Text from './Text.js';

export default function FormHelperText({
  text,
}: {|
  text: string,
|}): React.Node {
  return (
    <Box marginTop={2}>
      <Text color="gray" size="sm">
        {text}
      </Text>
    </Box>
  );
}
