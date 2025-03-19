import { ButtonSocial, Flex } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <ButtonSocial
        data-testid="apple-button-login"
        onClick={() => {
          // action here
        }}
        service="apple"
        type="continue"
      />
    </Flex>
  );
}
