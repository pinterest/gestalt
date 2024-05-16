import { Box, Flex, Label, SelectList, Text } from 'gestalt';

export default function SoleIndicatorExample() {
  return (
    <Flex
      alignItems="center"
      direction="column"
      gap={{
        row: 0,
        column: 2,
      }}
      height="100%"
      justifyContent="center"
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
        <Box color="infoBase" height={12} rounding="circle" width={12} />
        <SelectList id="solo-color" onChange={() => {}}>
          {[
            { label: 'Your total audience', value: '5' },
            { label: 'Active in the last week', value: '7' },
            { label: 'Active in the last month', value: '30' },
          ].map(({ label, value }) => (
            <SelectList.Option key={label} label={label} value={value} />
          ))}
        </SelectList>
      </Flex>
    </Flex>
  );
}
