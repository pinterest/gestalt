import { useRef } from 'react';
import { Text, Flex } from 'gestalt';
export default function TestElement() {
  const ref = useRef(null);
  return (
    <div ref={ref}>
      <Text>Test</Text>
    </div>
  );
}
