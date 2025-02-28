import { Flex, SearchGuideLink } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <SearchGuideLink
        color={[
          'rgb(255, 223, 233)',
          'rgb(215, 237, 255)',
          'rgb(204, 246, 238)',
          'rgb(255, 228, 193)',
        ]}
        href="https://pinterest.com"
        onClick={({ event }) => event.preventDefault()}
        text="Gradient"
      />
    </Flex>
  );
}
