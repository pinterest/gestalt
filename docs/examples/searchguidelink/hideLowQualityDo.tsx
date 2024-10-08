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
      <SearchGuideLink color="02" href="http://pinterest.com" text="Good Search" />
      <SearchGuideLink color="03" href="http://pinterest.com" text="Nice Search" />
      <SearchGuideLink color="04" href="http://pinterest.com" text="Relevant Search" />
    </Flex>
  );
}
