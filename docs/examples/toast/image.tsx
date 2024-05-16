import { ReactNode } from 'react';
import { Flex, Image, Toast } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      {/* @ts-expect-error - TS2741 - Property 'dismissButton' is missing in type '{ text: string; thumbnail: { image: Element; }; }' but required in type 'ToastProps'. */}
      <Toast
        text="Pin promoted"
        thumbnail={{
          image: (
            <Image
              alt="A regular sandwich with tomato, lettuce, and cheese."
              naturalHeight={564}
              naturalWidth={564}
              src="https://i.pinimg.com/564x/90/e2/17/90e217ea5513fcfcada465c763250b7e.jpg"
            />
          ),
        }}
      />
    </Flex>
  );
}
