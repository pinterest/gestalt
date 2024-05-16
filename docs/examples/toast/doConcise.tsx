import { ReactNode } from 'react';
import { Box, Flex, Image, Toast } from 'gestalt';

export default function Example() {
  return (
    <Box height="100%" paddingY={4} width="100%">
      <Flex alignItems="end" height="100%" justifyContent="center" width="100%">
{ /* @ts-expect-error - TS2741 - Property 'dismissButton' is missing in type '{ primaryAction: { accessibilityLabel: string; label: string; role: "button"; onClick: () => void; }; text: string; thumbnail: { image: Element; }; }' but required in type 'ToastProps'. */}
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
                alt="Flamingo pattern"
                naturalHeight={1}
                naturalWidth={1}
                src="https://i.pinimg.com/564x/39/b7/5e/39b75ec3211d0efe8e727da2c2af1966.jpg"
              />
            ),
          }}
        />
      </Flex>
    </Box>
  );
}
