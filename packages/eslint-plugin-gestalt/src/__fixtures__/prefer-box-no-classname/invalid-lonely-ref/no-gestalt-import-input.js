import { useRef } from 'react';
export default function TestElement() {
  const ref = useRef(null);
  return (
    <div ref={ref}>
      <button />
    </div>
  );
}
