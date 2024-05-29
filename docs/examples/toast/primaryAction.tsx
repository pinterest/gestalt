import { Flex, Image, Toast } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      
      <Toast
        primaryAction={{
          accessibilityLabel: 'Edit your Pin',
          label: 'Edit',
          role: 'button',
          onClick: () => {},
        }}
        text="Saved to your profile!"
        thumbnail={{
          image: (
            <Image
              alt="Pink flamingo drawing pattern on a dark green background"
              naturalHeight={1}
              naturalWidth={1}
              src="https://i.pinimg.com/564x/39/b7/5e/39b75ec3211d0efe8e727da2c2af1966.jpg"
            />
          ),
        }}
      />
    </Flex>
  );
}
