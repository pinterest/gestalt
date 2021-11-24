// @flow strict
import { type Node } from 'react';
import { Box, Flex, Link, Text } from 'gestalt';

export default function Footer(): Node {
  return (
    <Box color="white" padding={4} mdPadding={6} lgPadding={8} role="contentinfo">
      <Box paddingY={6} marginTop={10} justifyContent="center" display="flex" alignItems="center">
        <Flex alignItems="center" maxWidth={1544} width="100%">
          <Text>
            <Link href="https://www.pinterestcareers.com/">
              Interested in working with Gestalt? Check out our Careers page!
            </Link>
          </Text>
        </Flex>
      </Box>
    </Box>
  );
}
