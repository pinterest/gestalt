// @flow strict
import { type Node } from 'react';
import { Box, Flex, Icon, Link, Text } from 'gestalt';
import trackButtonClick from './buttons/trackButtonClick.js';
import LINKS from './LINK_REPOSITORY.js';

const links = [
  {
    title: 'Careers',
    url: LINKS.PINTEREST_CAREERS,
    external: true,
  },
  {
    title: 'Code sandbox',
    url: LINKS.CODE_SANDBOX,
    external: true,
  },
  { title: 'GitHub', url: LINKS.GESTALT_GITHUB, external: true },
];

export default function Footer(): Node {
  return (
    <Box padding={4}>
      <Flex direction="row" alignItems="center" wrap>
        <Box column={12} mdColumn={3} padding={2}>
          <Flex
            alignItems="center"
            gap={{
              row: 2,
              column: 0,
            }}
          >
            <Box aria-hidden>
              <Icon icon="pinterest" color="default" size={24} accessibilityLabel="" />
            </Box>
            <Text size="100">
              <Link
                accessibilityLabel="Visit Pinterest.com"
                href={LINKS.PINTEREST_CANONICAL}
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
              href={LINKS.NETLIFY}
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
