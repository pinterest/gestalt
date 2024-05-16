import { ReactNode } from 'react';
import { Avatar, Flex, Toast } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      {/* @ts-expect-error - TS2741 - Property 'dismissButton' is missing in type '{ text: string; thumbnail: { avatar: Element; }; }' but required in type 'ToastProps'. */}
      <Toast
        text="Switched to Mara Ibrahim"
        thumbnail={{
          avatar: <Avatar name="Keerthi" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" />,
        }}
      />
    </Flex>
  );
}
