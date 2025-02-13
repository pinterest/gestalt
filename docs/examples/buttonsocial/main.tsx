import { ButtonSocial, Flex } from 'gestalt';

export default function Example() {

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <ButtonSocial
        href="https://pinterest.com"
        iconStart="pinterest"
        size="lg"
        text="Pinterest"
      />
    </Flex>
  );
}
