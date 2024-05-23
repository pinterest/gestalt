// @ts-nocheck
import { useRef } from 'react';
import { Box as RenamedBox } from 'gestalt';
export default function TestElement() {
  const ref = useRef(null);
  return (
    <RenamedBox>
      <div ref={ref}>
        <RenamedBox />
      </div>
    </RenamedBox>
  );
}
