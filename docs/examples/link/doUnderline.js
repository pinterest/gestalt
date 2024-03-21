// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Flex, Link, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center">
      <Box color="elevationAccent" padding={4} rounding={4} width="90%">
        <Flex direction="column" gap={{ column: 4, row: 0 }}>
          <Text align="center" weight="bold">
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
            <Link display="inline" href="http://www.pinterest.com">
              pinterest.com{' '}
            </Link>
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
}
