import { ButtonLink, Flex } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <ButtonLink
        accessibilityLabel="Go back"
        disabled
        href="https://www.pinterest.com/"
        onClick={({ event }) => event.preventDefault()}
        size="lg"
        text="Go back"
      />
    </Flex>
  );
}
