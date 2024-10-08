import { Flex, SearchGuide } from 'gestalt';

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
      <SearchGuide color="01" text="Designs" />
      <SearchGuide color="02" text="Outfits" />
      <SearchGuide color="03" text="Vintage" />
      <SearchGuide color="11" text="Gray" />
    </Flex>
  );
}
