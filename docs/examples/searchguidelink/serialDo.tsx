import { Flex, SearchGuideLink } from 'gestalt';

export default function Example() {
  return (
    <Flex
      alignContent="stretch"
      alignItems="center"
      gap={2}
      height="100%"
      justifyContent="center"
      width="100%"
    >
      <SearchGuideLink color="01" href="http://pinterest.com" text="Designs" />
      <SearchGuideLink color="02" href="http://pinterest.com" text="Outfits" />
      <SearchGuideLink color="03" href="http://pinterest.com" text="Vintage" />
      <SearchGuideLink color="11" href="http://pinterest.com" text="Gray" />
    </Flex>
  );
}
