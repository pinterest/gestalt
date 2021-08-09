import { useRef } from 'react';
import { Box } from 'gestalt';
export default function TestElement() {
  const ref = useRef(null);
  return (
    <Box>
      <div ref={ref}>
        <Box />
      </div>
    </Box>
  );
}
