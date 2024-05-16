import { ReactNode } from 'react';
import { Flex, Link, Text, Toast } from 'gestalt';

export default function Example() {
  return (
    <Flex
      alignItems="center"
      direction="column"
      gap={2}
      height="100%"
      justifyContent="center"
      width="100%"
    >
      {/* @ts-expect-error - TS2741 - Property 'dismissButton' is missing in type '{ text: string; }' but required in type 'ToastProps'. */}
      <Toast text="Signed as Three Crafty Ladies" />
      {/* @ts-expect-error - TS2741 - Property 'dismissButton' is missing in type '{ text: Element; }' but required in type 'ToastProps'. */}
      <Toast
        text={
          <Text inline>
            Saved to{' '}
            <Link
              display="inlineBlock"
              href="https://www.pinterest.com/search/pins/?q=home%20decor"
              target="blank"
            >
              Home decor
            </Link>
          </Text>
        }
      />
    </Flex>
  );
}
