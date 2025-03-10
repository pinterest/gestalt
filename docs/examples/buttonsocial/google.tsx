import { ButtonSocial, Flex } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <ButtonSocial
        accessibilityLabel="Login in Pinterest"
        href="https://pinterest.com"
        service={3}
        target="blank"
        text={2}
      />
    </Flex>
  );
}
