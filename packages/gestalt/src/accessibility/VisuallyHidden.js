// @flow strict
import { type Node } from 'react';
import Box from '../Box.js';

export default function VisuallyHidden({ children }: {| children: Node |}): Node {
  return (
    <Box position="relative" dangerouslySetInlineStyle={{ __style: { display: 'inline' } }}>
      <Box display="visuallyHidden">{children}</Box>
    </Box>
  );
}
