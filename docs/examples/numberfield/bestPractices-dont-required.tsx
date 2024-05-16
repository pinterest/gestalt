import { useState } from 'react';
import { Flex, NumberField } from 'gestalt';

export default function Example() {
  const [values, setValues] = useState<{
    first: number | null | undefined;
    second: number | null | undefined;
    third: number | null | undefined;
  }>({
    first: undefined,
    second: undefined,
    third: undefined,
  });

  return (
    <Flex
      alignItems="center"
      direction="column"
      gap={3}
      height="100%"
      justifyContent="center"
      width="100%"
    >
      <NumberField
        helperText="* This field is required."
        id="best-practices-dont-required-first"
        label="First number"
        onChange={({ value }) => {
          setValues((prevValues) => ({ ...prevValues, first: value }));
        }}
        // @ts-expect-error - TS2322 - Type 'number | null | undefined' is not assignable to type 'number | undefined'.
        value={values.first}
      />
      <NumberField
        helperText="* This field is required."
        id="best-practices-dont-required-second"
        label="Second number"
        onChange={({ value }) => {
          setValues((prevValues) => ({ ...prevValues, second: value }));
        }}
        // @ts-expect-error - TS2322 - Type 'number | null | undefined' is not assignable to type 'number | undefined'.
        value={values.second}
      />
      <NumberField
        id="best-practices-dont-required-third"
        label="Third number"
        onChange={({ value }) => {
          setValues((prevValues) => ({ ...prevValues, third: value }));
        }}
        // @ts-expect-error - TS2322 - Type 'number | null | undefined' is not assignable to type 'number | undefined'.
        value={values.third}
      />
    </Flex>
  );
}
