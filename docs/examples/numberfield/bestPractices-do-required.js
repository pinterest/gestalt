// @flow strict
import { useState } from 'react';
import { Flex, NumberField } from 'gestalt';

export default function Example(): React$Node {
  const [values, setValues] = useState({
    first: undefined,
    second: undefined,
    third: undefined,
  });

  return (
    <Flex
      alignItems="center"
      direction="column"
      gap={3}
      justifyContent="center"
      height="100%"
      width="100%"
    >
      <NumberField
        id="best-practices-do-required-first"
        label="First number"
        onChange={({ value }) => {
          setValues((prevValues) => ({ ...prevValues, first: value }));
        }}
        value={values.first}
      />
      <NumberField
        id="best-practices-do-required-second"
        label="Second number"
        onChange={({ value }) => {
          setValues((prevValues) => ({ ...prevValues, second: value }));
        }}
        value={values.second}
      />
      <NumberField
        id="best-practices-do-required-third"
        label="Third number (optional)"
        onChange={({ value }) => {
          setValues((prevValues) => ({ ...prevValues, third: value }));
        }}
        value={values.third}
      />
    </Flex>
  );
}
