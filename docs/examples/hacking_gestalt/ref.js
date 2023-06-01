// @flow strict
import { useEffect, useRef, type Node } from 'react';
import { Flex, TextField } from 'gestalt';

export default function Example(): Node {
  const ref = useRef<null | HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.backgroundColor = 'aquamarine';
    }
  }, [ref]);

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <TextField
        errorMessage="Please don't do this!"
        id="refExample"
        onChange={() => {}}
        readOnly
        ref={ref}
        value="Custom color"
      />
    </Flex>
  );
}
