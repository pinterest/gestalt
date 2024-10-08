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
      <SearchGuide color="01" text="Designs" />
      <SearchGuide color="02" text="Outfits" />
      <SearchGuide color="03" text="Vintage" />
      <SearchGuide color="04" text="Sketch" />
      <SearchGuide color="05" text="Story" />
      <SearchGuide color="06" text="Illustration" />
      <SearchGuide color="07" text="Art" />
      <SearchGuide color="08" text="Photography" />
      <SearchGuide color="09" text="Crochet" />
    </Flex>
  );
}
