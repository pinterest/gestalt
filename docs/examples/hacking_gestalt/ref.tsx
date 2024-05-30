import { useEffect, useRef } from 'react';
import { Flex, TextField } from 'gestalt';

export default function Example() {
  const ref = useRef<null | HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.backgroundColor = 'aquamarine';
    }
  }, [ref]);

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <TextField
        ref={ref}
        errorMessage="Please don't do this!"
        id="refExample"
        onChange={() => {}}
        readOnly
        value="Custom color"
      />
    </Flex>
  );
}
