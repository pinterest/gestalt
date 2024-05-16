import { ReactNode, useEffect, useRef, useState } from 'react';
import { Box, Flex, NumberField } from 'gestalt';

export default function Example() {
  const [currentValue, setCurrentValue] = useState<undefined | number>();
  const [errorMessage, setErrorMessage] = useState<undefined | string>(undefined);
  const ref = useRef<null | HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current && ref.current.checkValidity() === false) {
      setErrorMessage("That episode doesn't exist (yet)!");
    } else {
      setErrorMessage(undefined);
    }
  }, [currentValue]);

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Box width={400}>
        <NumberField
          ref={ref}
          errorMessage={errorMessage}
          id="refExampleNumberField"
          label="Enter a Star Wars episode number"
          max={9}
          min={1}
          onChange={({ value }) => {
            setCurrentValue(value);
          }}
          placeholder="Enter a number from 1–9"
          step={2}
          value={currentValue}
        />
      </Box>
    </Flex>
  );
}
