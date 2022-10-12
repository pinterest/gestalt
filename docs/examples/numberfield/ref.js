// @flow strict
import { useEffect, useRef, useState } from 'react';
import { Box, Flex, NumberField } from 'gestalt';

export default function Example(): React$Node {
  const [currentValue, setCurrentValue] = useState();
  const [errorMessage, setErrorMessage] = useState(undefined);
  const ref = useRef();

  useEffect(() => {
    if (ref.current && ref.current.checkValidity() === false) {
      setErrorMessage("That episode doesn't exist (yet)!");
    } else {
      setErrorMessage(undefined);
    }
  }, [currentValue]);

  return (
    <Flex alignItems="center" justifyContent="center" height="100%" width="100%">
      <Box width={400}>
        <NumberField
          errorMessage={errorMessage}
          id="refExampleNumberField"
          label="Enter a Star Wars episode number"
          max={9}
          min={1}
          onChange={({ value }) => {
            setCurrentValue(value);
          }}
          placeholder="Enter a number from 1–9"
          ref={ref}
          step={2}
          value={currentValue}
        />
      </Box>
    </Flex>
  );
}
