import { ButtonLink, Flex } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <ButtonLink
        accessibilityLabel=""
        href="https://www.pinterest.com/"
        iconEnd="visit"
        iconStart="sparkle"
        size="lg"
        text="Visit AI solution"
      />
    </Flex>
  );
}
