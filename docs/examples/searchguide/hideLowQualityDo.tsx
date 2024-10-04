import { Flex, SearchGuide } from 'gestalt';

export default function Example() {
  return (
    <Flex
      alignContent="stretch"
      alignItems="center"
      gap={2}
      height="100%"
      justifyContent="center"
      overflow="scroll"
      width="100%"
    >
      <SearchGuide color="02" text="Good Search" />
      <SearchGuide color="03" text="Nice Search" />
      <SearchGuide color="04" text="Relevant Search" />
    </Flex>
  );
}
