import { Flex, SearchGuideLink } from 'gestalt';

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
      <SearchGuideLink color="01" href="http://pinterest.com" text="Search with one result" />
      <SearchGuideLink
        color="11"
        href="http://pinterest.com"
        text="Search with unrelated results"
      />
    </Flex>
  );
}
