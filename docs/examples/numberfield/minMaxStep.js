// @flow strict
import { type Node, useState } from 'react';
import { Flex, NumberField } from 'gestalt';

export default function Example(): Node {
  const [value1, setValue1] = useState<void | number>();
  const [value2, setValue2] = useState<void | number>();

  return (
    <Flex
      alignItems="center"
      direction="column"
      gap={4}
      justifyContent="center"
      height="100%"
      width="100%"
    >
      <Flex.Item minWidth="80%">
        <NumberField
          helperText="Use the arrow buttons to increase/decrease the input value"
          id="minMaxStepExampleNumberField1"
          label="Stepping in intervals of 5"
          max={25}
          min={5}
          onChange={({ value }) => {
            setValue1(value);
          }}
          step={5}
          value={value1}
        />
      </Flex.Item>

      <Flex.Item minWidth="80%">
        <NumberField
          helperText="Use the arrow buttons to increase/decrease the input value"
          id="minMaxStepExampleNumberField2"
          label="Stepping in intervals of 0.1"
          max={2}
          min={-2}
          onChange={({ value }) => {
            setValue2(value);
          }}
          step={0.1}
          value={value2}
        />
      </Flex.Item>
    </Flex>
  );
}
