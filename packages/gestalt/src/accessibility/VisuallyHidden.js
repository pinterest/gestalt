// @flow strict
import { type Node as ReactNode } from 'react';
import Box from '../Box.js';

export default function VisuallyHidden({ children }: { children: ReactNode }): ReactNode {
  return (
    <Box position="relative" dangerouslySetInlineStyle={{ __style: { display: 'inline' } }}>
      <Box display="visuallyHidden">{children}</Box>
    </Box>
  );
}
