// @flow strict
import { type Node } from 'react';
import { Box, Flex, Icon, Link, Text } from 'gestalt';
import trackButtonClick from './buttons/trackButtonClick.js';

const links = [
  {
    title: 'Careers',
    url: 'https://www.pinterestcareers.com/job-search-results/?keyword=gestalt',
    external: true,
  },
  {
    title: 'Code sandbox',
    url: 'https://codesandbox.io/s/gestalt-cnwugg?file=/yourCode.js',
    external: true,
  },
  { title: 'GitHub', url: 'https://github.com/pinterest/gestalt', external: true },
];

export default function Footer(): Node {
  return (
    <Box padding={4}>
      <Flex direction="row" alignItems="center" wrap>
        <Box column={12} mdColumn={3} padding={2}>
          <Flex alignItems="center" gap={2}>
            <Box aria-hidden>
              <Icon icon="pinterest" color="default" size={24} accessibilityLabel="" />
            </Box>
            <Text size="100">
              <Link
                accessibilityLabel="Visit Pinterest.com"
                href="https://www.pinterest.com"
                onClick={() => trackButtonClick('Pinterest copyright')}
              >
                &copy; {new Date().getFullYear()} Pinterest
              </Link>
            </Text>
          </Flex>
        </Box>
        <Box
          column={12}
          mdColumn={6}
          padding={2}
          display="inlineBlock"
          mdDisplay="flex"
          alignItems="center"
          justifyContent="center"
          wrap
        >
          {links.map((link) => (
            <Box marginBottom={2} lgMarginBottom={0} smMarginEnd={4} key={link.title}>
              <Text inline>
                <Link
                  href={link.url}
                  target="blank"
                  onClick={() => trackButtonClick(link.title)}
                  externalLinkIcon={link.external ? 'default' : 'none'}
                >
                  {link.title}
                </Link>
              </Text>
            </Box>
          ))}
        </Box>
        <Box
          column={12}
          mdColumn={3}
          padding={2}
          display="block"
          mdDisplay="flex"
          justifyContent="end"
        >
          <Text inline size="100">
            <Link
              href="https://www.netlify.com/"
              target="blank"
              externalLinkIcon={{ color: 'default', size: '100' }}
            >
              This site is powered by Netlify
            </Link>
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}
