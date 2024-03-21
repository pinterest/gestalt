// @flow strict
import { type Node as ReactNode } from 'react';
import { Flex, Link, Text, Toast } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex
      alignItems="center"
      direction="column"
      gap={2}
      height="100%"
      justifyContent="center"
      width="100%"
    >
      <Toast text="Signed as Three Crafty Ladies" />
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
