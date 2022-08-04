// @flow strict
import { type Node } from 'react';
import { Box, Flex, Label, SelectList, Text } from 'gestalt';

export default function SoleIndicatorExample(): Node {
  return (
    <Flex
      direction="column"
      gap={{
        row: 0,
        column: 2,
      }}
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Label htmlFor="solo-color">
        <Text>Audience 1</Text>
      </Label>
      <Flex
        alignItems="center"
        gap={{
          row: 2,
          column: 0,
        }}
      >
        <Box rounding="circle" color="infoBase" width={12} height={12} />
        <SelectList
          id="solo-color"
          onChange={() => {}}
          options={[
            { label: 'Your total audience', value: '5' },
            { label: 'Active in the last week', value: '7' },
            { label: 'Active in the last month', value: '30' },
          ]}
        />
      </Flex>
    </Flex>
  );
}
