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
      <SearchGuide text="Results" />
    </Flex>
  );
}
