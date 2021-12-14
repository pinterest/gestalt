// @flow strict
import { type Node } from 'react';
import { Box, Flex, Icon, Link, Text } from 'gestalt';
import trackButtonClick from './buttons/trackButtonClick.js';

export default function Footer(): Node {
  return (
    <Box color="lightGray" padding={4} mdPadding={6} lgPadding={8} role="contentinfo">
      <Box paddingX={2} paddingY={1}>
        <Flex alignItems="center" gap={4} justifyContent="between">
          <Text color="darkGray" weight="bold">
            <Link
              href="https://www.pinterest.com"
              onClick={() => trackButtonClick('Pinterest logo')}
              target="blank"
            >
              <Box paddingX={2}>
                <Flex alignItems="center" gap={2}>
                  <Icon
                    icon="pinterest"
                    color="red"
                    size={24}
                    accessibilityLabel="Pinterest Logo"
                  />
                  Pinterest
                </Flex>
              </Box>
            </Link>
          </Text>

          <Text>
            <Link href="https://www.pinterestcareers.com/" target="blank">
              Interested in working with Gestalt? Check out our Careers page!
            </Link>
          </Text>

          <Text>
            <Link href="https://www.netlify.com/" target="blank">
              This site is powered by Netlify
            </Link>
          </Text>
        </Flex>
      </Box>
    </Box>
  );
}
