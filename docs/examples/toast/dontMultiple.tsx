import { ReactNode } from 'react';
import { Avatar, Box, Flex, Icon, Toast } from 'gestalt';

export default function Example() {
  return (
    <Box height="100%" paddingY={4} width="90%">
      <Flex
        alignItems="center"
        direction="column"
        gap={2}
        height="100%"
        justifyContent="end"
        width="100%"
      >
{ /* @ts-expect-error - TS2741 - Property 'dismissButton' is missing in type '{ primaryAction: { accessibilityLabel: string; label: string; role: "button"; onClick: () => void; }; text: string; thumbnail: { icon: Element; }; }' but required in type 'ToastProps'. */}
        <Toast
          primaryAction={{
            accessibilityLabel: 'View new recommendations',
            label: 'View',
            role: 'button',
            onClick: () => {},
          }}
          text="You have new recommendations"
          thumbnail={{
            icon: <Icon accessibilityLabel="" icon="lightbulb" />,
          }}
        />
{ /* @ts-expect-error - TS2741 - Property 'dismissButton' is missing in type '{ text: string; type: "success"; }' but required in type 'ToastProps'. */}
        <Toast text="Password updated" type="success" />
{ /* @ts-expect-error - TS2741 - Property 'dismissButton' is missing in type '{ text: string; thumbnail: { avatar: Element; }; }' but required in type 'ToastProps'. */}
        <Toast
          text="2-factor authentication added for Sabina Romero"
          thumbnail={{
            avatar: <Avatar name="Keerthi" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" />,
          }}
        />
      </Flex>
    </Box>
  );
}
