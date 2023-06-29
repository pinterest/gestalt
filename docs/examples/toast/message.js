// @flow strict
import { type Node } from 'react';
import { Flex, Link, Text, Toast } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex
      direction="column"
      gap={2}
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
    >
      <Toast text="Signed as Three Crafty Ladies" />
      <Toast
        text={
          <Text inline>
            Saved to{' '}
            <Link
              display="inlineBlock"
              target="blank"
              href="https://www.pinterest.com/search/pins/?q=home%20decor"
            >
              Home decor
            </Link>
          </Text>
        }
      />
    </Flex>
  );
}
