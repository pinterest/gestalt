import { ReactNode } from 'react';
import Box from '../Box';

export default function VisuallyHidden({ children }: { children: ReactNode }) {
  return (
    <Box dangerouslySetInlineStyle={{ __style: { display: 'inline' } }} position="relative">
      <Box display="visuallyHidden">{children}</Box>
    </Box>
  );
}
