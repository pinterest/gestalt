import { Flex, Toast } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Toast
        helperLink={{
          text: 'Retry',
          accessibilityLabel: 'Retry connecting to the Internet',
          href: '#',
        }}
        text="You are not connected to the Internet."
        type="error"
      />
    </Flex>
  );
}
