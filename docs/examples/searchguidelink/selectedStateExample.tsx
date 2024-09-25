import { Flex, SearchGuideLink } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <SearchGuideLink
        accessibilityLabel="Following"
        href="http://pinterest.com"
        selected
        text="Following"
      />
    </Flex>
  );
}
