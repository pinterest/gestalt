// @flow strict
import { type Node, useState } from 'react';
import { Box, Flex, NumberField } from 'gestalt';

export default function Example(): Node {
  const [ageValue, setAgeValue] = useState<void | number>();
  const [petsValue, setPetsValue] = useState<void | number>();

  return (
    <Box height="100%" padding={3}>
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
    </Box>
  );
}
