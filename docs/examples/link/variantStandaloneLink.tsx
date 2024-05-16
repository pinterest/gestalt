import { ReactNode } from 'react';
import { Box, Flex, Link, Text } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center">
      <Flex gap={{ row: 4, column: 0 }} width={300} wrap>
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
