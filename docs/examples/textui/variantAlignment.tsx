import { Divider, Flex, TextUI } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex direction="column" gap={{ column: 4, row: 0 }} width={200}>
        <TextUI align="start">Start (default)</TextUI>
        <Divider />
        <TextUI align="end">End</TextUI>
        <Divider />
        <TextUI align="center">Center</TextUI>
        <Divider />
        <TextUI align="forceLeft">Force left</TextUI>
        <Divider />
        <TextUI align="forceRight">Force right</TextUI>
      </Flex>
    </Flex>
  );
}
