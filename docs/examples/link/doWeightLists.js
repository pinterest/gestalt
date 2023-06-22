// @flow strict
import { type Node } from 'react';
import { Avatar, Box, Flex, Link, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex height="100%" width="100%" gap={2} alignItems="center" justifyContent="center">
      <Box aria-hidden>
        <Avatar
          name="Shanice Romero"
          accessibilityLabel="Shanice Romero"
          size="sm"
          src="https://i.ibb.co/7tGKGvb/shanice.jpg"
        />
      </Box>
      <Text>
        <Text weight="bold" inline>
          <Link href="https://www.pinterest.com" display="inline" underline="hover">
            {' '}
            Shanice Romero{' '}
          </Link>
        </Text>{' '}
        saved to
        <Text weight="bold" inline>
          <Link href="https://www.pinterest.com" display="inline" underline="hover">
            {' '}
            Capoeira{' '}
          </Link>
        </Text>
      </Text>
    </Flex>
  );
}
