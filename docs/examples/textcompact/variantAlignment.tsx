import { Divider, Flex, TextCompact } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex direction="column" gap={{ column: 4, row: 0 }} width={200}>
        <TextCompact align="start">Start (default)</TextCompact>
        <Divider />
        <TextCompact align="end">End</TextCompact>
        <Divider />
        <TextCompact align="center">Center</TextCompact>
        <Divider />
        <TextCompact align="forceLeft">Force left</TextCompact>
        <Divider />
        <TextCompact align="forceRight">Force right</TextCompact>
      </Flex>
    </Flex>
  );
}
