// @flow strict
import { type Node } from 'react';
import { Box, Flex, Icon, Link, Text } from 'gestalt';
import trackButtonClick from './buttons/trackButtonClick.js';

export default function Footer(): Node {
  return (
    <Box color="lightGray" padding={4} mdPadding={6} lgPadding={8} role="contentinfo">
      <Box paddingX={2} paddingY={1} display="flex" direction="column" mdDirection="row">
        <Box column={12} mdColumn={3} padding={2}>
          <Flex alignItems="center" gap={2}>
            <Box aria-hidden>
              <Icon icon="pinterest" color="red" size={24} accessibilityLabel="" />
            </Box>
            <Text color="darkGray" weight="bold">
              <Link
                accessibilityLabel="Visit Pinterest.com"
                href="https://www.pinterest.com"
                onClick={() => trackButtonClick('Pinterest logo')}
              >
                Pinterest
              </Link>
            </Text>
          </Flex>
        </Box>
        <Box column={12} mdColumn={6} padding={2}>
          <Text inline>
            <Link inline href="https://www.pinterestcareers.com/" target="blank">
              Interested in working with Gestalt? Check out our Careers page!
            </Link>
          </Text>
        </Box>
        <Box column={12} mdColumn={3} padding={2} display="flex">
          <Text inline>
            <Link inline href="https://www.netlify.com/" target="blank">
              This site is powered by Netlify
            </Link>
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
