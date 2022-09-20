// @flow strict

import { type Node } from 'react';
import Box from './Box.js';
import Text from './Text.js';

type Props = {|
  text: string,
  addA11yPause?: boolean,
|};

export default function FormHelperText({ text, addA11yPause = false }: Props): Node {
  return (
    <Box marginTop={2}>
      <Text color="subtle" size="100">
        {addA11yPause ? <Box display="visuallyHidden">:</Box> : null}
        {text}
      </Text>
    </Box>
  );
}
