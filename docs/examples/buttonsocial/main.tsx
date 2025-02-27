import { ButtonSocial, Flex } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <ButtonSocial
        accessibilityLabel="Login in Pinterest"
        href="https://pinterest.com"
        onClick={({ event }) => event.preventDefault()}
        service={4}
        text={1}
      />
    </Flex>
  );
}
