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
      <SearchGuide color="01" text="Search with one result" />
      <SearchGuide color="11" text="Search with unrelated results" />
    </Flex>
  );
}
