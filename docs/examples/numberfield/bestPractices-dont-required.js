// @flow strict
import { useState } from 'react';
import { Flex, NumberField } from 'gestalt';

export default function Example(): React$Node {
  const [values, setValues] = useState<{|
    first: ?number,
    second: ?number,
    third: ?number,
  |}>({
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
        helperText="* This field is required."
        id="best-practices-dont-required-first"
        label="First number"
        onChange={({ value }) => {
          setValues((prevValues) => ({ ...prevValues, first: value }));
        }}
        // $FlowFixMe[incompatible-type]
        value={values.first}
      />
      <NumberField
        helperText="* This field is required."
        id="best-practices-dont-required-second"
        label="Second number"
        onChange={({ value }) => {
          setValues((prevValues) => ({ ...prevValues, second: value }));
        }}
        // $FlowFixMe[incompatible-type]
        value={values.second}
      />
      <NumberField
        id="best-practices-dont-required-third"
        label="Third number"
        onChange={({ value }) => {
          setValues((prevValues) => ({ ...prevValues, third: value }));
        }}
        // $FlowFixMe[incompatible-type]
        value={values.third}
      />
    </Flex>
  );
}
