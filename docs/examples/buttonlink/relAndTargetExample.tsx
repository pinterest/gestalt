import { ButtonLink, Flex } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <ButtonLink
        accessibilityLabel="Visit Pinterest"
        href="https://www.pinterest.com/"
        iconEnd="visit"
        onClick={({ event }) => event.preventDefault()}
        rel="nofollow"
        size="lg"
        target="blank"
        text="Visit Pinterest"
      />
    </Flex>
  );
}
