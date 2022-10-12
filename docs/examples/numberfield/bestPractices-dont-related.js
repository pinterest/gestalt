// @flow strict
import { useState } from 'react';
import { Flex, NumberField } from 'gestalt';

export default function Example(): React$Node {
  const [ageValue, setAgeValue] = useState();
  const [petsValue, setPetsValue] = useState();

  return (
    <Flex alignItems="center" gap={4} justifyContent="center" height="100%" width="100%">
      <NumberField
        id="best-practices-dont-related-age"
        label="Age"
        onChange={({ value }) => {
          setAgeValue(value);
        }}
        value={ageValue}
      />
      <NumberField
        id="best-practices-dont-related-pets"
        label="Number of pets"
        onChange={({ value }) => {
          setPetsValue(value);
        }}
        value={petsValue}
      />
    </Flex>
  );
}
