import { Flex, SearchGuide } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <SearchGuide accessibilityLabel="Following" selected text="Following" />
    </Flex>
  );
}
