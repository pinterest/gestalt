// @flow strict
import { type Node } from 'react';
import { Box, Flex, Link, Text } from 'gestalt';

export default function Footer(): Node {
  return (
    <Box padding={4} mdPadding={6} lgPadding={8} role="contentinfo">
      <Box paddingX={2} paddingY={1}>
        <Flex alignItems="center" gap={4} justifyContent="between">
          <Text>
            Interested in working with Gestalt? Check out our{' '}
            <Link href="https://www.pinterestcareers.com/" inline>
              Careers page!
            </Link>
          </Text>

          <Text>
            <Link href="https://www.netlify.com/">This site is powered by Netlify</Link>
          </Text>
        </Flex>
      </Box>
    </Box>
  );
}
