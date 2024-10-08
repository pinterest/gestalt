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
      <SearchGuideLink color="06" href="http://pinterest.com" text="Makeover" />
      <SearchGuideLink color="07" href="http://pinterest.com" text="Inspiration" />
      <SearchGuideLink color="08" href="http://pinterest.com" text="Ideas" />
      <SearchGuideLink color="09" href="http://pinterest.com" text="Dreams" />
    </Flex>
  );
}
