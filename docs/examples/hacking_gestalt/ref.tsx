import { ReactNode, useEffect, useRef } from 'react';
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
        // @ts-expect-error - TS2322 - Type '{ ref: MutableRefObject<HTMLInputElement | null>; errorMessage: string; id: string; onChange: () => void; readOnly: true; value: string; }' is not assignable to type 'IntrinsicAttributes & TextFieldProps & RefAttributes<HTMLInputElement>'.
        readOnly
        value="Custom color"
      />
    </Flex>
  );
}
