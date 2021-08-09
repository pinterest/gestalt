import { Box } from 'gestalt';
import { useRef } from 'react';
export default function TestElement() {
  const ref = useRef(null);
  return (
    <Box ref={ref}>
      <div />
    </Box>
  );
}
