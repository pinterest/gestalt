// @flow strict
import { type Node } from 'react';
import { Box, Flex, Link, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex height="100%" alignItems="center" justifyContent="center">
      <Flex gap={{ row: 4, column: 0 }} wrap width={300}>
        {[
          'About',
          'Blog',
          'Business',
          'Careers',
          'Developers',
          'Removals',
          'Privacy',
          'Personalized ads',
          'Terms',
        ].map((item, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <Text key={idx} color="subtle" weight="bold">
            <Box paddingY={1}>
              <Link href="https://www.pinterest.com/">{item}</Link>
            </Box>
          </Text>
        ))}
      </Flex>
    </Flex>
  );
}
