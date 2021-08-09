import { useRef } from 'react';
import { Box as RenamedBox } from 'gestalt';
export default function TestElement() {
  const ref = useRef(null);
  return (
    <Box>
      <Box ref={ref}>
        <Box />
      </Box>
    </Box>
  );
}
