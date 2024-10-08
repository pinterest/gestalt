import { Flex, SearchGuideLink } from 'gestalt';

export default function Example() {
  return (
    <Flex
      alignContent="stretch"
      alignItems="center"
      direction="column"
      gap={2}
      height="100%"
      justifyContent="center"
      overflow="scroll"
      width="100%"
    >
      <SearchGuideLink color="01" href="http://pinterest.com" text="Designs" />
      <SearchGuideLink color="02" href="http://pinterest.com" text="Outfits" />
      <SearchGuideLink color="03" href="http://pinterest.com" text="Vintage" />
      <SearchGuideLink color="04" href="http://pinterest.com" text="Sketch" />
      <SearchGuideLink color="05" href="http://pinterest.com" text="Story" />
      <SearchGuideLink color="06" href="http://pinterest.com" text="Illustration" />
      <SearchGuideLink color="07" href="http://pinterest.com" text="Art" />
      <SearchGuideLink color="08" href="http://pinterest.com" text="Photography" />
      <SearchGuideLink color="09" href="http://pinterest.com" text="Crochet" />
    </Flex>
  );
}
