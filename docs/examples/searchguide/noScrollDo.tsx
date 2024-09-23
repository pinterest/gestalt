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
      <SearchGuide color="06" text="Makeover" />
      <SearchGuide color="07" text="Inspiration" />
      <SearchGuide color="08" text="Ideas" />
      <SearchGuide color="09" text="Dreams" />
    </Flex>
  );
}
