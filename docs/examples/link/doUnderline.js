// @flow strict
import { type Node } from 'react';
import { Box, Flex, Link, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex height="100%" alignItems="center" justifyContent="center">
      <Box color="elevationAccent" padding={4} rounding={4} width="90%">
        <Flex gap={{ column: 4, row: 0 }} direction="column">
          <Text weight="bold" align="center">
            {' '}
            Product details{' '}
          </Text>
          <Text>
            {' '}
            Tennis-inspired retro sneaker by Pinterest, elevated with a stacked midsole for extra
            height and a chunky profile.{' '}
          </Text>
          <Text inline>
            {' '}
            Ships from and sold by{' '}
            <Link href="http://www.pinterest.com" display="inline">
              pinterest.com{' '}
            </Link>
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
}
