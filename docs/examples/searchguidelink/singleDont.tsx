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
      <SearchGuideLink href="http://pinterest.com" text="Results" />
    </Flex>
  );
}
